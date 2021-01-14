import React, { useState, useEffect } from 'react'
import * as qs from 'qs'
import { cleanObject } from 'utils/cleaner'
import { api } from '../../utils/api'
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
    fetch(`${api.baseUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
      if (res.ok) {
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
  }, [])

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List list={list} users={users} />
  </div>
}
