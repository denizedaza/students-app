const axios = require('axios')

export async function getStudents() {
  try { 
    const response = await fetch(`https://api.hatchways.io/assessment/students`)
    return await response.json()
    
  } catch (err) {
    return []
  }
}