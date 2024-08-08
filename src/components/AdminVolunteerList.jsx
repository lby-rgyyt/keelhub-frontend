import React, { useState, useEffect, useCallback } from 'react';
import { Table, Dropdown, Menu, message } from 'antd';
import axios from 'axios';

const AdminVolunteerList = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ 
        current: 1, 
        pageSize: 10, 
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100']
    });

    const fetchVolunteers = useCallback(async (params = { current: 1, pageSize: 10 }) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/volunteer-tasks/admin/volunteers', {
                params: { 
                    page: params.current, 
                    pageSize: params.pageSize 
                }
            });
            setVolunteers(response.data.data || []);
            setPagination(prev => ({
                ...prev,
                current: params.current,
                pageSize: params.pageSize,
                total: response.data.total || 0
            }));
        } catch (error) {
            console.error('Error fetching volunteers:', error);
            message.error('Failed to fetch volunteers');
            setVolunteers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVolunteers(pagination);
    }, [fetchVolunteers]);

    const handleTableChange = (newPagination, filters, sorter) => {
        fetchVolunteers({
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <div>{`${record.firstName} ${record.lastName}`}</div>
                    <div style={{ fontSize: '0.8em', color: 'gray' }}>{record.email}</div>
                </div>
            ),
        },
        {
            title: 'Current Task',
            dataIndex: 'currentTask',
            key: 'currentTask',
            render: (currentTask) => (
                <div>
                    {currentTask ? (
                        <>
                            <div>{currentTask.taskName}</div>
                            <div>{currentTask.progress}</div>
                        </>
                    ) : (
                        'No active task'
                    )}
                </div>
            ),
        },
        {
            title: 'Due Date',
            dataIndex: ['currentTask', 'dueDate'],
            key: 'dueDate',
            render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A',
        },
        {
            title: 'Template',
            dataIndex: ['currentTask', 'description'],
            key: 'description',
            render: (description) => description || 'N/A',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: 'Approve',
                                onClick: () => handleApprove(record.id),
                            },
                            {
                                key: '2',
                                label: 'Reject',
                                onClick: () => handleReject(record.id),
                            },
                            {
                                key: '3',
                                label: 'Extend Due Date',
                                onClick: () => handleExtendDueDate(record.id),
                            },
                        ],
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>Actions</a>
                </Dropdown>
            ),
        },
    ];
        
    const handleApprove = async (id) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/volunteer-tasks/volunteers/${id}/complete-current-task`);
            
            if (response.data.data.status === 'unassigned' || response.data.data.status === 'completed') {
                setVolunteers(prev => prev.filter(v => v.id !== id));
                message.success('Volunteer onboarding completed and status updated to unassigned.');
            } else {
                await fetchVolunteers(pagination, true);
                message.success('Task approved successfully');
            }
        } catch (error) {
            console.error('Error approving task:', error);
            message.error('Failed to approve task');
        }
    };
        
    const handleReject = (id) => {
        // Implement reject logic
        };
    
    const handleExtendDueDate = (id) => {
    // Implement extend due date logic
    };    



    return (
        <div>
            <h2>Admin Volunteer Onboarding Tracker</h2>
            <Table 
                columns={columns} 
                dataSource={volunteers}
                rowKey="id"
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default AdminVolunteerList;


