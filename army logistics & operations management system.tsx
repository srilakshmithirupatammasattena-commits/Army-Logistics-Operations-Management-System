import React, { useState } from 'react';
import { AlertCircle, Package, Users, Target, Bell, Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const ArmyLogisticsSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});

  const [inventory, setInventory] = useState([
    { id: 1, name: 'M4A1 Rifle', category: 'Weapons', quantity: 250, minThreshold: 100, location: 'Warehouse A' },
    { id: 2, name: 'Humvee Vehicle', category: 'Vehicles', quantity: 45, minThreshold: 20, location: 'Motor Pool' },
    { id: 3, name: 'Medical Kit', category: 'Medical', quantity: 75, minThreshold: 100, location: 'Medical Bay' },
    { id: 4, name: 'Night Vision Goggles', category: 'Equipment', quantity: 120, minThreshold: 80, location: 'Warehouse B' },
    { id: 5, name: 'Body Armor', category: 'Equipment', quantity: 180, minThreshold: 150, location: 'Warehouse A' }
  ]);
  
  const [soldiers, setSoldiers] = useState([
    { id: 1, name: 'Samba Reddy', rank: 'Captain', role: 'Infantry Commander', status: 'Active', trainingStatus: 'Completed', deployments: 3 },
    { id: 2, name: 'Ananya Sharma', rank: 'Lieutenant', role: 'Logistics Officer', status: 'Active', trainingStatus: 'In Progress', deployments: 2 },
    { id: 3, name: 'Karthik Rao', rank: 'Sergeant', role: 'Field Medic', status: 'On Leave', trainingStatus: 'Completed', deployments: 5 },
    { id: 4, name: 'Divya Sree', rank: 'Corporal', role: 'Communications', status: 'Active', trainingStatus: 'Completed', deployments: 1 },
    { id: 5, name: 'Vikram Chowdary', rank: 'Major', role: 'Operations Lead', status: 'Active', trainingStatus: 'Completed', deployments: 7 }
  ]);
  
  const [missions, setMissions] = useState([
    { 
      id: 1, 
      name: 'Operation Eagle Eye', 
      location: 'Grid 47-N', 
      objective: 'Reconnaissance and Intelligence Gathering', 
      startDate: '2025-01-05', 
      endDate: '2025-01-12', 
      status: 'Active', 
      assignedSoldiers: 12, 
      assignedEquipment: ['M4A1 Rifle', 'Humvee Vehicle', 'Night Vision Goggles'] 
    },
    { 
      id: 2, 
      name: 'Operation Shield', 
      location: 'Base Perimeter', 
      objective: 'Security Detail and Patrol', 
      startDate: '2025-01-10', 
      endDate: '2025-01-15', 
      status: 'Planning', 
      assignedSoldiers: 8, 
      assignedEquipment: ['Night Vision Goggles', 'Body Armor'] 
    },
    { 
      id: 3, 
      name: 'Operation Thunder', 
      location: 'Training Ground Alpha', 
      objective: 'Combat Training Exercise', 
      startDate: '2025-01-20', 
      endDate: '2025-01-25', 
      status: 'Completed', 
      assignedSoldiers: 25, 
      assignedEquipment: ['M4A1 Rifle', 'Body Armor'] 
    }
  ]);
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Medical Kit inventory below threshold (75/100)', timestamp: '2025-12-25 09:30' },
    { id: 2, type: 'info', message: 'Operation Eagle Eye scheduled to start in 11 days', timestamp: '2025-12-25 08:15' },
    { id: 3, type: 'success', message: 'New equipment shipment received: 50 M4A1 Rifles', timestamp: '2025-12-24 16:45' },
    { id: 4, type: 'warning', message: 'Soldier training completion deadline approaching', timestamp: '2025-12-24 14:20' }
  ]);

  const getLowInventoryItems = () => inventory.filter(item => item.quantity < item.minThreshold);
  const getUpcomingMissions = () => missions.filter(m => m.status === 'Active' || m.status === 'Planning');
  
  const openModal = (type, data = {}) => {
    setModalType(type);
    setFormData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'inventory') {
        setInventory(inventory.filter(item => item.id !== id));
      } else if (type === 'soldier') {
        setSoldiers(soldiers.filter(s => s.id !== id));
      } else if (type === 'alert') {
        setAlerts(alerts.filter(a => a.id !== id));
      }
    }
  };

  const Dashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Inventory</p>
              <p className="text-3xl font-bold text-blue-600">{inventory.length}</p>
              <p className="text-xs text-gray-500 mt-1">Items tracked</p>
            </div>
            <Package className="text-blue-500" size={40} />
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Soldiers</p>
              <p className="text-3xl font-bold text-green-600">{soldiers.filter(s => s.status === 'Active').length}</p>
              <p className="text-xs text-gray-500 mt-1">Out of {soldiers.length} total</p>
            </div>
            <Users className="text-green-500" size={40} />
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Missions</p>
              <p className="text-3xl font-bold text-purple-600">{missions.filter(m => m.status === 'Active').length}</p>
              <p className="text-xs text-gray-500 mt-1">{missions.filter(m => m.status === 'Planning').length} in planning</p>
            </div>
            <Target className="text-purple-500" size={40} />
          </div>
        </div>
        
        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Critical Alerts</p>
              <p className="text-3xl font-bold text-red-600">{getLowInventoryItems().length}</p>
              <p className="text-xs text-gray-500 mt-1">Require attention</p>
            </div>
            <AlertCircle className="text-red-500" size={40} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            Low Inventory Alerts
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {getLowInventoryItems().map(item => (
              <div key={item.id} className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Current: {item.quantity} | Min Required: {item.minThreshold}</p>
                <p className="text-xs text-gray-500">{item.location}</p>
              </div>
            ))}
            {getLowInventoryItems().length === 0 && (
              <p className="text-gray-500 text-center py-8">✓ All inventory levels are adequate</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="text-purple-500" size={20} />
            Upcoming Missions
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {getUpcomingMissions().map(mission => (
              <div key={mission.id} className="p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{mission.name}</p>
                    <p className="text-sm text-gray-600">{mission.location} | {mission.startDate}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    mission.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {mission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const InventoryModule = () => {
    const filteredInventory = inventory.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
          <button 
            onClick={() => openModal('inventory')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-md"
          >
            <Plus size={20} /> Add Item
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <Search className="text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, category, or location..." 
                className="flex-1 outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredInventory.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      <span className="font-semibold">{item.quantity}</span>
                      <span className="text-gray-500 text-sm"> / {item.minThreshold}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        item.quantity < item.minThreshold 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.quantity < item.minThreshold ? '⚠ Low Stock' : '✓ Adequate'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => openModal('inventory', item)}
                        className="text-blue-600 hover:text-blue-800 mr-3 transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete('inventory', item.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredInventory.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No items found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const SoldierModule = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Soldier Management</h2>
        <button 
          onClick={() => openModal('soldier')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow-md"
        >
          <Plus size={20} /> Add Soldier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {soldiers.map(soldier => (
          <div key={soldier.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{soldier.name}</h3>
                <p className="text-sm text-gray-600">{soldier.rank}</p>
                <p className="text-sm text-blue-600 font-medium">{soldier.role}</p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                soldier.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {soldier.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Training Status:</span>
                <span className={`font-medium ${
                  soldier.trainingStatus === 'Completed' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {soldier.trainingStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deployments:</span>
                <span className="font-bold text-blue-600">{soldier.deployments}</span>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => openModal('soldier', soldier)}
                className="flex-1 bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100 transition font-medium"
              >
                View Profile
              </button>
              <button 
                onClick={() => handleDelete('soldier', soldier.id)}
                className="px-3 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MissionModule = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Mission Planning</h2>
        <button 
          onClick={() => openModal('mission')}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition shadow-md"
        >
          <Plus size={20} /> Create Mission
        </button>
      </div>

      <div className="space-y-4">
        {missions.map(mission => (
          <div key={mission.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{mission.name}</h3>
                <p className="text-gray-600 mt-1">{mission.objective}</p>
              </div>
              <span className={`px-4 py-2 rounded-full font-medium text-sm ${
                mission.status === 'Active' ? 'bg-green-100 text-green-800' : 
                mission.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {mission.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">{mission.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium text-gray-900">{mission.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium text-gray-900">{mission.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Personnel</p>
                <p className="font-medium text-gray-900">{mission.assignedSoldiers} soldiers</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Assigned Equipment:</p>
              <div className="flex flex-wrap gap-2">
                {mission.assignedEquipment.map((eq, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                View Details
              </button>
              <button 
                onClick={() => openModal('mission', mission)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Edit Mission
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AlertsModule = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Alerts & Notifications</h2>
        <button 
          onClick={() => setAlerts([])}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className={`p-5 rounded-lg border-l-4 shadow-sm hover:shadow-md transition ${
            alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
            alert.type === 'info' ? 'bg-blue-50 border-blue-500' :
            'bg-green-50 border-green-500'
          }`}>
            <div className="flex items-start gap-3">
              <Bell className={`mt-1 flex-shrink-0 ${
                alert.type === 'warning' ? 'text-yellow-600' :
                alert.type === 'info' ? 'text-blue-600' :
                'text-green-600'
              }`} size={22} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{alert.message}</p>
                <p className="text-sm text-gray-500 mt-1">{alert.timestamp}</p>
              </div>
              <button 
                onClick={() => handleDelete('alert', alert.id)}
                className="text-gray-400 hover:text-gray-600 transition"
                title="Dismiss"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No alerts at this time</p>
            <p className="text-sm mt-2">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Army Logistics & Operations Management</h1>
          <p className="text-green-100 mt-1">Integrated Resource & Mission Control System</p>
        </div>
      </header>

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Target },
              { id: 'inventory', label: 'Inventory', icon: Package },
              { id: 'soldiers', label: 'Soldiers', icon: Users },
              { id: 'missions', label: 'Missions', icon: Target },
              { id: 'alerts', label: 'Alerts', icon: Bell }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium whitespace-nowrap flex items-center gap-2 transition ${
                    activeTab === tab.id 
                      ? 'border-b-2 border-green-600 text-green-600 bg-green-50' 
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'inventory' && <InventoryModule />}
        {activeTab === 'soldiers' && <SoldierModule />}
        {activeTab === 'missions' && <MissionModule />}
        {activeTab === 'alerts' && <AlertsModule />}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold capitalize">
                {formData.id ? 'Edit' : 'Add New'} {modalType}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Form for {formData.id ? 'editing' : 'adding'} {modalType} would appear here with input fields.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={closeModal}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={closeModal}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Save {modalType}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>© 2025 Army Logistics & Operations Management System | Developed for Military Resource Management</p>
        </div>
      </footer>
    </div>
  );
};

export default ArmyLogisticsSystem;
