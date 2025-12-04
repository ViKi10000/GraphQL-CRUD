import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { FaUser, FaUsers, FaTrash } from "react-icons/fa";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String!
    $age: Int!
    $isMarried: Boolean!
  ) {
    updateUser(id: $id, name: $name, age: $age, isMarried: $isMarried) {
      id
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", isMarried: false });

  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const { data: selectedUser } = useQuery(GET_USER_BY_ID, {
    variables: { id: selectedId },
    skip: !selectedId,
  });

  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium mb-2">Error loading data</p>
          <p className="text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    );

  const handleCreate = async () => {
    if (!form.name || !form.age) return;
    await createUser({
      variables: { ...form, age: Number(form.age) },
    });
    setForm({ name: "", age: "", isMarried: false });
    refetch();
  };

  const handleUpdate = async () => {
    await updateUser({
      variables: { id: selectedId, ...form, age: Number(form.age) },
    });
    setSelectedId(null);
    setForm({ name: "", age: "", isMarried: false });
    refetch();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser({ variables: { id } });
      if (selectedId === id) {
        setSelectedId(null);
        setForm({ name: "", age: "", isMarried: false });
      }
      refetch();
    }
  };

  const handleCancel = () => {
    setSelectedId(null);
    setForm({ name: "", age: "", isMarried: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 font-sans antialiased">
      
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-500 text-lg">Create, edit, and manage users</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
         
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                {selectedId ? "Edit User" : "Create New User"}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    placeholder="Enter name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isMarried"
                    checked={form.isMarried}
                    onChange={(e) =>
                      setForm({ ...form, isMarried: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900 cursor-pointer"
                  />
                  <label htmlFor="isMarried" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                    Married
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  {!selectedId ? (
                    <button
                      onClick={handleCreate}
                      className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Create
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 active:scale-[0.98] transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Selected User Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Selected User Details
              </h2>

              {!selectedUser ? (
                <div className="flex items-center justify-center h-64 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="text-center">
                    <FaUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">Select a user to view details</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                        {selectedUser.getUserById.name}
                      </h3>
                      <p className="text-gray-500 text-lg mb-4">
                        Age: <span className="font-medium text-gray-700">{selectedUser.getUserById.age}</span>
                      </p>
                      <div className="inline-flex items-center gap-2">
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                            selectedUser.getUserById.isMarried
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {selectedUser.getUserById.isMarried ? "Married" : "Single"}
                        </span>
                      </div>
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-semibold text-gray-600">
                        {selectedUser.getUserById.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              All Users
            </h2>
            <span className="text-sm text-gray-500 font-medium">
              {data?.getUsers?.length || 0} {data?.getUsers?.length === 1 ? 'user' : 'users'}
            </span>
          </div>

          {data?.getUsers?.length === 0 ? (
            <div className="text-center py-16">
              <FaUsers className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-medium text-lg">No users yet</p>
              <p className="text-gray-400 text-sm mt-1">Create your first user to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.getUsers.map((user) => (
                <div
                  key={user.id}
                  className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${
                    selectedId === user.id ? 'ring-2 ring-gray-900 shadow-md' : ''
                  }`}
                  onClick={() => {
                    setSelectedId(user.id);
                    setForm(user);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-gray-600">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete user"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Age: <span className="font-medium text-gray-700">{user.age}</span>
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isMarried
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {user.isMarried ? "Married" : "Single"}
                    </span>
                    {selectedId === user.id && (
                      <span className="text-xs text-gray-500 font-medium">Selected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
