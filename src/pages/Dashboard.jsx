import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./Dashboard.css";

const Dashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const fetchComplaints = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/admin/complaints", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const result = await response.json();
            setComplaints(
                result.map(({ email, message, done }) => ({
                    email,
                    message,
                    status: done ? "Resolved" : "Pending",
                }))
            );
        } catch (error) {
            console.error("Error fetching complaints:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    useEffect(() => {
        setFilteredComplaints(
            complaints.filter(
                ({ email, message }) =>
                    email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    message.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, complaints]);

    return (
        <div className="dashboard-container">
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : (
                <>
                    <h1 className="dashboard-title">Complaints Dashboard</h1>
                    <input
                        type="text"
                        placeholder="Search complaints..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                    <DataTable
                        columns={[
                            { name: "Email", selector: (row) => row.email },
                            { name: "Message", selector: (row) => row.message },
                            {
                                name: "Status",
                                selector: (row) => row.status,
                                sortable: true,
                                cell: (row) => (
                                    <span
                                        className={row.status === "Resolved" ? "status-resolved" : "status-pending"}
                                    >
                                        {row.status}
                                    </span>
                                ),
                            },
                        ]}
                        data={filteredComplaints}
                    />
                </>
            )}
        </div>
    );
};

export default Dashboard;
