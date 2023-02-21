import React from 'react'


const Records = ({data, members}) => {
  return (
    <table className="table" border="1px solid!">
        <thead>
            <tr>
                <th scope='col'>Member Name</th>
                <th scope='col'>Type of Absence</th>
                <th scope='col'>Start Date</th>
                <th scope='col'>End Date</th>
                <th scope='col'>Member Note</th>
                <th scope='col'>Status</th>
                <th scope='col'>Admitter Note</th>
            </tr>
        </thead>
        <tbody>
            {data
            .map(item => (
                <tr>
                    <td>{item.memberName}</td>

                    <td>{item.type}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.memberNote}</td>
                    <td>{item.confirmedAt}</td>
                    <td>{item.admitterNote}</td>
                </tr>
            ))}
        </tbody>
    </table>
  ) 
}


export default Records;

