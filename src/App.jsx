import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Records from './components/Records';
import Pagination from './components/Pagination';
import absences from './components/absences.json';
import members from './components/members.json';

function App() {

    // To hold the actual data
    var membersResponse:JSON;
    var absencesResponse:JSON;
    const [id, setId] = useState([])
    const [members, setMembers] = useState([])
    const [absences, setAbsences] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const getAbsences = (request, response, next) => {
      try {
        const populatedAbsences = absences.payload.map(absence => {
          const member = members.payload.find(member => member.userId === absence.userId);
          return { ...absence, memberName: member?.name };
        });
        alert(populatedAbsences);
        return response.json({ ...absences, payload: populatedAbsences });
      } catch(err) {
        alert("ERROR:::"+err);
        next(err);
      }
    };


    useEffect(() => {

       axios.get('members.json')
               .then(res => {
                       setMembers(res.data.payload);
                       membersResponse = res.data.payload;
                       setId(membersResponse.find(member => member.userId === "2664"));
                       setLoading(true);
                   })
                   .catch(() => {
                       alert('There was an error while retrieving the members data');
                   })
        axios.get('absences.json')
               .then(res => {
                       setAbsences(res.data.payload);
                       absencesResponse = res.data.payload;
                       setLoading(true);
                   })
                   .catch(() => {
                       alert('There was an error while retrieving the absences data');
                   })
        axios.get('absences.json')
            .then(res => {
                    setData(res.data.payload);
                    setLoading(false);
                })
                .catch(() => {
                    alert('There was an error while constructing the members absences data');
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
