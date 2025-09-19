import React from 'react'


const Account = () => {
  return (
    <>
        <div className="card bg-base-100 shadow-xl border border-gray-200">
            <div className="card-body">
              <h2 className="card-title text-gray-900">Account Details</h2>
              <p className="text-gray-500">Manage your personal information.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    
                   
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    
                   
                    className="input input-bordered input-primary w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                  
                   
                    className="input input-bordered input-primary w-full"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button  className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
    </>
  )
}

export default Account