import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchId, setSearchId] = useState('')
  const [selectedCards, setSelectedCards] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [showConfirm, setShowConfirm] = useState(null)
  const navigate = useNavigate()

  // Helper function to get employee image
  const getEmployeeImage = (employee) => {
    if (employee.profile_image && employee.profile_image.trim() !== '') {
      return employee.profile_image
    }
    // Use UI Avatars service to generate avatar based on name
    const name = encodeURIComponent(employee.employee_name)
    return `https://ui-avatars.com/api/?name=${name}&background=1A73E8&color=fff&size=200&bold=true&font-size=0.5`
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://dummy.restapiexample.com/api/v1/employees')
      const result = await response.json()
      
      if (result.status === 'success' && result.data) {
        setEmployees(result.data)
        setFilteredEmployees(result.data)
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
      // Fallback to provided data if API fails
      const fallbackData = {
        "status": "success",
        "data": [
          {"id": 1, "employee_name": "Tiger Nixon", "employee_salary": "320800", "employee_age": "61", "profile_image": ""},
          {"id": 2, "employee_name": "Garrett Winters", "employee_salary": "170750", "employee_age": "63", "profile_image": ""},
          {"id": 3, "employee_name": "Ashton Cox", "employee_salary": "86000", "employee_age": "66", "profile_image": ""},
          {"id": 4, "employee_name": "Cedric Kelly", "employee_salary": "433060", "employee_age": "22", "profile_image": ""},
          {"id": 5, "employee_name": "Airi Satou", "employee_salary": "162700", "employee_age": "33", "profile_image": ""},
          {"id": 6, "employee_name": "Brielle Williamson", "employee_salary": "372000", "employee_age": "61", "profile_image": ""},
          {"id": 7, "employee_name": "Herrod Chandler", "employee_salary": "137500", "employee_age": "59", "profile_image": ""},
          {"id": 8, "employee_name": "Rhona Davidson", "employee_salary": "327900", "employee_age": "55", "profile_image": ""},
          {"id": 9, "employee_name": "Colleen Hurst", "employee_salary": "205500", "employee_age": "39", "profile_image": ""},
          {"id": 10, "employee_name": "Sonya Frost", "employee_salary": "103600", "employee_age": "23", "profile_image": ""},
          {"id": 11, "employee_name": "Jena Gaines", "employee_salary": "90560", "employee_age": "30", "profile_image": ""},
          {"id": 12, "employee_name": "Quinn Flynn", "employee_salary": "342000", "employee_age": "22", "profile_image": ""},
          {"id": 13, "employee_name": "Charde Marshall", "employee_salary": "470600", "employee_age": "36", "profile_image": ""},
          {"id": 14, "employee_name": "Haley Kennedy", "employee_salary": "313500", "employee_age": "43", "profile_image": ""},
          {"id": 15, "employee_name": "Tatyana Fitzpatrick", "employee_salary": "385750", "employee_age": "19", "profile_image": ""},
          {"id": 16, "employee_name": "Michael Silva", "employee_salary": "198500", "employee_age": "66", "profile_image": ""},
          {"id": 17, "employee_name": "Paul Byrd", "employee_salary": "725000", "employee_age": "64", "profile_image": ""},
          {"id": 18, "employee_name": "Gloria Little", "employee_salary": "237500", "employee_age": "59", "profile_image": ""},
          {"id": 19, "employee_name": "Bradley Greer", "employee_salary": "132000", "employee_age": "41", "profile_image": ""},
          {"id": 20, "employee_name": "Dai Rios", "employee_salary": "217500", "employee_age": "35", "profile_image": ""},
          {"id": 21, "employee_name": "Jenette Caldwell", "employee_salary": "345000", "employee_age": "30", "profile_image": ""},
          {"id": 22, "employee_name": "Yuri Berry", "employee_salary": "675000", "employee_age": "40", "profile_image": ""},
          {"id": 23, "employee_name": "Caesar Vance", "employee_salary": "106450", "employee_age": "21", "profile_image": ""},
          {"id": 24, "employee_name": "Doris Wilder", "employee_salary": "85600", "employee_age": "23", "profile_image": ""}
        ]
      }
      setEmployees(fallbackData.data)
      setFilteredEmployees(fallbackData.data)
    } finally {
      setLoading(false)
    }
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleSearch = () => {
    if (searchId.trim() === '') {
      setFilteredEmployees(employees)
      return
    }

    const id = parseInt(searchId)
    if (isNaN(id)) {
      showNotification('Please enter a valid employee ID', 'error')
      return
    }

    const found = employees.find(emp => emp.id === id)
    if (found) {
      setFilteredEmployees([found])
      showNotification(`Found employee: ${found.employee_name}`, 'success')
    } else {
      setFilteredEmployees([])
      showNotification('Employee not found', 'error')
    }
  }

  const handleCardClick = (id) => {
    navigate(`/employee/${id}`)
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    const employee = employees.find(emp => emp.id === id)
    setShowConfirm({
      type: 'single',
      id: id,
      name: employee?.employee_name || 'this employee',
      message: `Are you sure you want to delete ${employee?.employee_name || 'this employee'}?`
    })
  }

  const confirmDelete = () => {
    if (showConfirm.type === 'single') {
      const id = showConfirm.id
      const updated = employees.filter(emp => emp.id !== id)
      setEmployees(updated)
      setFilteredEmployees(filteredEmployees.filter(emp => emp.id !== id))
      setSelectedCards(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
      showNotification(`${showConfirm.name} has been deleted successfully`, 'success')
    } else if (showConfirm.type === 'bulk') {
      const count = selectedCards.size
      const updated = employees.filter(emp => !selectedCards.has(emp.id))
      setEmployees(updated)
      setFilteredEmployees(filteredEmployees.filter(emp => !selectedCards.has(emp.id)))
      setSelectedCards(new Set())
      showNotification(`${count} employee(s) have been deleted successfully`, 'success')
    }
    setShowConfirm(null)
  }

  const handleEdit = (id, e) => {
    e.stopPropagation()
    // Edit functionality for display purpose
    showNotification(`Edit functionality for employee ID: ${id}`, 'info')
  }

  const handleCardSelect = (id, e) => {
    e.stopPropagation()
    setSelectedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedCards.size === filteredEmployees.length) {
      setSelectedCards(new Set())
    } else {
      setSelectedCards(new Set(filteredEmployees.map(emp => emp.id)))
    }
  }

  const handleBulkDelete = () => {
    if (selectedCards.size === 0) {
      showNotification('Please select at least one employee to delete', 'error')
      return
    }

    setShowConfirm({
      type: 'bulk',
      count: selectedCards.size,
      message: `Are you sure you want to delete ${selectedCards.size} employee(s)?`
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="text-xl" style={{ color: '#4B5563' }}>Loading employees...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Toast Notification */}
      {notification && (
        <div 
          className="fixed top-4 right-4 z-50 rounded-lg shadow-2xl px-6 py-4 flex items-center gap-3 animate-slide-in"
          style={{ 
            backgroundColor: notification.type === 'error' ? '#DC2626' : notification.type === 'info' ? '#1A73E8' : '#16A34A',
            color: '#FFFFFF',
            minWidth: '300px'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {notification.type === 'error' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : notification.type === 'info' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            )}
          </svg>
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-auto text-white hover:opacity-70"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div 
            className="rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: '#1F2937' }}>Confirm Delete</h3>
            <p className="mb-6" style={{ color: '#4B5563' }}>{showConfirm.message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(null)}
                className="px-4 py-2 rounded-lg font-medium transition-all"
                style={{ 
                  backgroundColor: '#E8EEF5',
                  color: '#1F2937'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4B5563'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#E8EEF5'}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg font-medium text-white transition-all"
                style={{ backgroundColor: '#DC2626' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="rounded-xl shadow-lg p-6 mb-6" style={{ backgroundColor: '#FFFFFF' }}>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#1F2937' }}>Employee Dashboard</h1>
          <p className="mb-4" style={{ color: '#4B5563' }}>
            Manage and view all employee information in one place. Search, view details, and manage employee records efficiently.
          </p>
          
          {/* Instructions */}
          <div className="rounded-lg p-4 mb-4 border-l-4" style={{ backgroundColor: '#E8EEF5', borderColor: '#1A73E8' }}>
            <h3 className="font-semibold mb-2" style={{ color: '#1A73E8' }}>How to use this dashboard:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: '#185ABC' }}>
              <li>Use the search bar below to find employees by their ID</li>
              <li>Click on any employee card to view detailed information</li>
              <li>Use the delete button on each card to remove an employee from the list</li>
              <li>Select multiple cards using checkboxes to delete them all at once</li>
              <li>The edit button is available for future functionality</li>
            </ul>
          </div>

          {/* Search Section */}
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium mb-2" style={{ color: '#1F2937' }}>
                Search Employee by ID
              </label>
              <input
                type="text"
                id="search"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter employee ID (e.g., 1, 2, 3...)"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all"
                style={{ 
                  borderColor: '#E8EEF5',
                  backgroundColor: '#FFFFFF',
                  color: '#1F2937'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1A73E8'
                  e.target.style.boxShadow = '0 0 0 3px rgba(26, 115, 232, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E8EEF5'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 text-white rounded-lg font-medium transition-all hover:shadow-lg transform hover:scale-105"
              style={{ backgroundColor: '#1A73E8' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#185ABC'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1A73E8'}
            >
              Search
            </button>
            <button
              onClick={() => {
                setSearchId('')
                setFilteredEmployees(employees)
              }}
              className="px-6 py-3 text-white rounded-lg font-medium transition-all"
              style={{ backgroundColor: '#4B5563' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1F2937'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4B5563'}
            >
              Clear
            </button>
          </div>

          {/* Bulk Actions */}
          {filteredEmployees.length > 0 && (
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 text-white rounded-lg transition-all text-sm font-medium hover:shadow-md"
                style={{ backgroundColor: '#16A34A' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                {selectedCards.size === filteredEmployees.length ? 'Deselect All' : 'Select All'}
              </button>
              {selectedCards.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 text-white rounded-lg transition-all text-sm font-medium hover:shadow-md"
                  style={{ backgroundColor: '#DC2626' }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  Delete Selected ({selectedCards.size})
                </button>
              )}
              <span className="text-sm" style={{ color: '#4B5563' }}>
                {selectedCards.size > 0 && `${selectedCards.size} employee(s) selected`}
              </span>
            </div>
          )}
        </div>

        {/* Employee Cards Grid */}
        {filteredEmployees.length === 0 ? (
          <div className="rounded-xl shadow-lg p-8 text-center" style={{ backgroundColor: '#FFFFFF' }}>
            <p className="text-lg" style={{ color: '#4B5563' }}>No employees found. Try a different search.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 font-medium" style={{ color: '#4B5563' }}>
              Showing {filteredEmployees.length} employee(s)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => handleCardClick(employee.id)}
                  className={`rounded-xl shadow-md cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl overflow-hidden ${
                    selectedCards.has(employee.id) ? 'ring-4' : ''
                  }`}
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderColor: selectedCards.has(employee.id) ? '#1A73E8' : 'transparent'
                  }}
                >
                  {/* Card Header with Image */}
                  <div className="relative" style={{ backgroundColor: '#E8EEF5' }}>
                    <div className="flex justify-center pt-6 pb-4">
                      <img
                        src={getEmployeeImage(employee)}
                        alt={employee.employee_name}
                        className="w-24 h-24 rounded-full object-cover border-4 shadow-lg"
                        style={{ borderColor: '#FFFFFF' }}
                      />
                    </div>
                    {/* Checkbox for selection */}
                    <div className="absolute top-3 right-3">
                      <input
                        type="checkbox"
                        checked={selectedCards.has(employee.id)}
                        onChange={(e) => handleCardSelect(employee.id, e)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-5 h-5 rounded cursor-pointer"
                        style={{ accentColor: '#1A73E8' }}
                      />
                    </div>
                    {/* ID Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold px-2 py-1 rounded-full text-white shadow-md" style={{ backgroundColor: '#1A73E8' }}>
                        ID: {employee.id}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-center" style={{ color: '#1F2937' }}>
                      {employee.employee_name}
                    </h3>
                    <div className="text-center mb-4" style={{ color: '#4B5563' }}>
                      <span className="text-sm">Age: {employee.employee_age}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => handleEdit(employee.id, e)}
                        className="flex-1 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold hover:shadow-md flex items-center justify-center gap-1 border-2"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          color: '#1F2937',
                          borderColor: '#E8EEF5'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1A73E8'
                          e.target.style.color = '#FFFFFF'
                          e.target.style.borderColor = '#1A73E8'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#FFFFFF'
                          e.target.style.color = '#1F2937'
                          e.target.style.borderColor = '#E8EEF5'
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(employee.id, e)}
                        className="flex-1 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold hover:shadow-md flex items-center justify-center gap-1 border-2"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          color: '#1F2937',
                          borderColor: '#E8EEF5'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#DC2626'
                          e.target.style.color = '#FFFFFF'
                          e.target.style.borderColor = '#DC2626'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#FFFFFF'
                          e.target.style.color = '#1F2937'
                          e.target.style.borderColor = '#E8EEF5'
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard

