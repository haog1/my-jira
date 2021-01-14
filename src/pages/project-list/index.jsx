import React, { useState, useEffect } from 'react'

import { api } from '../../common/api'
import { SearchPanel } from './search-panel'
import { List } from './list'

export const ProjectListPage = () => {

  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  const [users, setUsers] = useState([])

  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${api.baseUrl}/projects`).then(async res => {
      if (res.ok) {
        console.log(res);
        setList(await res.json())
      }
    })
  }, [param]) // Take effect when param changes


  useEffect(() => {
    fetch(`${api.baseUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [users])

  return <div>
    <SearchPanel param={param} setParam={setParam}/>
    <List list={list} />
  </div>
}
