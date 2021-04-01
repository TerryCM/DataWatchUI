/*
 * API Client Adapter
 *
 * Could someday be turned into an npm package for external users.
 * 
 * OpenAPI Specification: <TODO>
 * 
 */

const axios = require('axios')
const qs = require('qs');

class Cacoa {
  constructor(params) {
      this.baseUrl = params ? params.baseUrl : '/api'
      this.token = params ? params.token : null
  }

  request(options) {
    if (!options.headers)
      options.headers = {}
    options.headers['Content-Type'] = 'application/json'
    if (this.token)
      options.headers['Authorization'] = `Bearer ${this.token}`
    
    options.timeout = 5 * 1000

    // Add custom parameter serializer to encode spaces with %20 instead of '+' 
    options.paramsSerializer = (params) => qs.stringify(params)

    //console.log(`axios request: token ${this.token != null}, ${options.method} ${options.url}`)
    return axios.request(options)
  }
  
  async get(path, params) { // params can contain optional "offset" & "limit" properties
    const res = await this.request({ method: 'get', url: `${this.baseUrl}${path}`, params })
    return res.data
  }

  async put(path, data) {
    const res = await this.request({ method: 'put', url: `${this.baseUrl}${path}`, data })
    return res.data
  }

  async post(path, data) {
    const res = await this.request({ method: 'post', url: `${this.baseUrl}${path}`, data })
    return res.data   
  }

  async patch(path, data) {
    const res = await this.request({ method: 'patch', url: `${this.baseUrl}${path}`, data })
    return res.data   
  }

  async delete(path) {
    const res = await this.request({ method: 'delete', url: `${this.baseUrl}${path}` })
    return res.data   
  }

  /* 
   * API endpoints -- Examples
   */

  async users(params) { return await this.get(`/users`, params) }

  async createUser(params) { return await this.post(`/users`, params) }

  async user(username) { return await this.get(`/users/${username || 'mine'}`) }

  async updateUser(username) { return await this.patch(`/users/${username || 'mine'}`) }

  async deleteUser(username) { return await this.delete(`/users/${username}`) }
}

module.exports = Cacoa