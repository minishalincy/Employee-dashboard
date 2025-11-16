import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function EmployeeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  // Helper function to get employee image
  const getEmployeeImage = (employee) => {
    if (employee && employee.profile_image && employee.profile_image.trim() !== '') {
      return employee.profile_image
    }
    // Use UI Avatars service to generate avatar based on name
    if (employee) {
      const name = encodeURIComponent(employee.employee_name)
      return `https://ui-avatars.com/api/?name=${name}&background=1A73E8&color=fff&size=300&bold=true&font-size=0.6`
    }
    return ''
  }

  useEffect(() => {
    fetchEmployeeDetail()
  }, [id])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const fetchEmployeeDetail = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`)
      const result = await response.json()
      
      if (result.status === 'success' && result.data) {
        setEmployee(result.data)
      } else {
        // Fallback: try to get from all employees
        const allResponse = await fetch('https://dummy.restapiexample.com/api/v1/employees')
        const allResult = await allResponse.json()
        if (allResult.status === 'success' && allResult.data) {
          const found = allResult.data.find(emp => emp.id === parseInt(id))
          if (found) {
            setEmployee(found)
          }
        } else {
          // Use fallback data
          const fallbackData = [
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
          const found = fallbackData.find(emp => emp.id === parseInt(id))
          if (found) {
            setEmployee(found)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching employee:', error)
      // Use fallback data
      const fallbackData = [
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
      const found = fallbackData.find(emp => emp.id === parseInt(id))
      if (found) {
        setEmployee(found)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="text-xl" style={{ color: '#4B5563' }}>Loading employee details...</div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F2937' }}>Employee not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 text-white rounded-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: '#1A73E8' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#185ABC'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1A73E8'}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    showNotification(`${employee.employee_name} has been deleted successfully`, 'success')
    setTimeout(() => {
      navigate('/')
    }, 1000)
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
            <p className="mb-6" style={{ color: '#4B5563' }}>
              Are you sure you want to delete {employee?.employee_name}?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
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

      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 hover:shadow-lg"
          style={{ backgroundColor: '#4B5563' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1F2937'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4B5563'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        <div className="rounded-xl shadow-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
          {/* Header Section with Image */}
          <div className="relative" style={{ backgroundColor: '#E8EEF5' }}>
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="relative mb-6">
                <img
                  src={getEmployeeImage(employee)}
                  alt={employee.employee_name}
                  className="w-40 h-40 rounded-full object-cover border-4 shadow-2xl"
                  style={{ borderColor: '#FFFFFF' }}
                />
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-white font-bold shadow-lg" style={{ backgroundColor: '#1A73E8' }}>
                  ID: {employee.id}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-center mb-2" style={{ color: '#1F2937' }}>
                {employee.employee_name}
              </h1>
              <p className="text-lg" style={{ color: '#4B5563' }}>
                Employee Profile
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee ID */}
              <div className="rounded-lg p-6 transition-all hover:shadow-md" style={{ backgroundColor: '#F5F7FA' }}>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#4B5563' }}>
                  Employee ID
                </label>
                <p className="text-3xl font-bold" style={{ color: '#1F2937' }}>{employee.id}</p>
              </div>

              {/* Age */}
              <div className="rounded-lg p-6 transition-all hover:shadow-md" style={{ backgroundColor: '#F5F7FA' }}>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#4B5563' }}>
                  Age
                </label>
                <p className="text-3xl font-bold" style={{ color: '#1F2937' }}>{employee.employee_age} <span className="text-xl" style={{ color: '#4B5563' }}>years</span></p>
              </div>

              {/* Salary */}
              <div className="rounded-lg p-6 transition-all hover:shadow-md md:col-span-2" style={{ backgroundColor: '#F5F7FA' }}>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#4B5563' }}>
                  Annual Salary
                </label>
                <p className="text-4xl font-bold" style={{ color: '#1A73E8' }}>
                  ${parseInt(employee.employee_salary).toLocaleString()}
                </p>
                <p className="text-sm mt-2" style={{ color: '#4B5563' }}>
                  ${(parseInt(employee.employee_salary) / 12).toLocaleString()} per month
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 justify-center">
              <button
                onClick={() => showNotification(`Edit functionality for employee ID: ${employee.id}`, 'info')}
                className="px-6 py-3 rounded-lg transition-all font-semibold hover:shadow-lg flex items-center gap-2 border-2"
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Employee
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 rounded-lg transition-all font-semibold hover:shadow-lg flex items-center gap-2 border-2"
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail

