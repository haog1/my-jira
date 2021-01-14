import React from 'react'

export const List = ({ users, list }) => {
  return <table>
    <thead>
      <tr>
        <th>Task</th>
        <th>Person</th>
      </tr>
    </thead>
    <tbody>
      {
        list?.map(task => <tr>
          <td>{task.name}</td>
          <td>{users.find(user => user.id === task.personId)?.name || 'Unkonwn'}</td>
        </tr>)
      }
    </tbody>
  </table>
}
