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
        axios.get('absences.json')
            .then(res => {
                absences  = res.data.payload;
                setData(res.data.payload);
                setLoading(true);
                axios.get('members.json')
                    .then(res1 => {
                        members = res1.data.payload;
                        setLoading(false);
                        try {
                            const populatedAbsences = res.data.payload.map(absence => {
                              const member = res1.data.payload.find(member => member.userId === absence.userId);
                              return { ...absence, memberName: member?.name };
                            });
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
            <Records data={currentRecords}
                     members={members} />
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default App;
