import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Records from './components/Records';
import Pagination from './components/Pagination';

function App() {

    // To hold the actual data
    let absences;
    let members;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    useEffect(() => {
        //call to fetch the absences json data
        axios.get('absences.json')
            .then(res => {
                setLoading(true);

                //call to fetch the members json data
                axios.get('members.json')
                    .then(res1 => {
                        setLoading(false);

                        //filter both the responses with matching userId and fetch the userName
                        //and construct a json element on absences as memberName to hold the name
                        try {
                            const populatedAbsences = res.data.payload.map(absence => {
                              const member = res1.data.payload.find(member => member.userId === absence.userId);
                              return { ...absence, memberName: member?.name };
                            });
                            //set the result json to data constant
                            setData(populatedAbsences);
                            console.log('data -- : ',data)
                            } catch(err) {
                              alert('There was an error while constructing the absences data'+err);
                            }
                    })
                    .catch(() => {
                        alert('There was an error while fetching the absences data');
                    })
            })
            .catch(() => {
                alert('There was an error while fetching the absences data');
            })
    }, [])

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)
    return (
        <div className='container mt-5'>
            <h2> Simple Pagination Example in React </h2>
            <Records data={currentRecords}/>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default App;
