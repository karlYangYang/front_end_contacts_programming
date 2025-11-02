import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: true
})

apiClient.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    let msg = '请求失败'
    if (error.response) {
      msg = error.response.data.error || error.response.statusText
    } else if (error.request) {
      msg = '无法连接到服务器'
    } else {
      msg = error.message
    }
    return Promise.reject(new Error(msg))
  }
)

const contactsAPI = {
  getAllContacts(groupName = null) {
    const params = groupName ? { group_name: groupName } : {}
    return apiClient.get('/contacts', { params })
  },

  addContact(contact) {
    return apiClient.post('/contacts', contact)
  },

  updateContact(id, contact) {
    return apiClient.put(`/contacts/${id}`, contact)
  },

  deleteContact(id) {
    return apiClient.delete(`/contacts/${id}`)
  },

  getAllGroups() {
    return apiClient.get('/groups')
  },

  addGroup(group) {
    return apiClient.post('/groups', group)
  },

  deleteGroup(id) {
    return apiClient.delete(`/groups/${id}`)
  },

  register(user) {
    return apiClient.post('/register', user)
  },

  login(credentials) {
    return apiClient.post('/login', credentials)
  },

  logout() {
    return apiClient.post('/logout')
  },

  checkAuth() {
    return apiClient.get('/check-auth')
  },

  searchContacts(keyword, groupName = null) {
    const params = { keyword }
    if (groupName) {
      params.group_name = groupName
    }
    return apiClient.get('/contacts/search', { params })
  }
}

export default contactsAPI

