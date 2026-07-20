const roles = ["student", "faculty", "admin"];

const RoleSelector = ({ selectedRole, onChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onChange(role)}
          className={`px-4 py-2 rounded-md border text-sm font-medium transition
            ${selectedRole === role
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;