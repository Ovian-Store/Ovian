import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("app_users")
        .select("id, email, name, role, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      {loading ? <p>Loading...</p> : (
        <div className="space-y-2">
          {users.map(u => (
            <div key={u.id} className="bg-white/5 p-3 rounded flex justify-between">
              <div>
                <div className="font-semibold">{u.email}</div>
                <div className="text-xs text-gray-400">{u.name}</div>
              </div>
              <div className="text-sm">{u.role}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
