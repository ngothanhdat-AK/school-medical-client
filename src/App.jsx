import "./App.css";

import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Resources from "./pages/Resource";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectRoute/ProtectRoute";
import MainLayout from "./components/MainLayout/MainLayout";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUserInfo} from "./redux/feature/userSlice";

// Admin pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateUser from "./pages/Admin/AccountManagement/CreateUser/CreateUser";
import ListUser from "./pages/Admin/AccountManagement/ListUser/ListUser";
import EditUser from "./pages/Admin/AccountManagement/EditUser/EditUser";
import CampaignList from "./pages/Admin/Campaign/CampaignList/CampaignList";
import CreateCampaign from "./pages/Admin/Campaign/CreateCampaign/CreateCampaign";
import DetailCampaign from "./pages/Admin/Campaign/DetailCampaign/DetailCampaign";
import HistoryCampaign from "./pages/Admin/Campaign/HistoryCampaign/HistoryCampaign";
import AddStudent from "./pages/Admin/StudentManagement/AddStudent/AddStudent";
import StudentList from "./pages/Admin/StudentManagement/StudentList/StudentList";
import UserProfileAdmin from "./pages/Admin/Profile/User/UserProfile";
import UpdateUserProfileAdmin from "./pages/Admin/Profile/Edit/UpdateUserProfile";

// Nurse pages
import NurseDashboard from "./pages/Nurse/Dashboard";
import AppointmentList from "./pages/Nurse/AppointmentManagement/AppointmentList/AppointmentList";
import AppointmentDetail from "./pages/Nurse/AppointmentManagement/AppointmentDetail/AppointmentDetail";
import NurseCampaignList from "./pages/Nurse/Campaign/CampaignList/CampaignList";
import NurseDetailCampaign from "./pages/Nurse/Campaign/DetailCampaign/DetailCampaign";
import NurseHistoryCampaign from "./pages/Nurse/Campaign/HistoryCampaign/HistoryCampaign";
import RecordForm from "./pages/Nurse/Campaign/RecordForm/RecordForm";
import CreateMedicalEvent from "./pages/Nurse/MediacalEvent/CreateMedicalEvent/CreateMedicalEvent";
import MedicalEventList from "./pages/Nurse/MediacalEvent/MedicalEventList/MedicalEventList";
import UserProfileNurse from "./pages/Nurse/Profile/User/UserProfile";
import UpdateUserProfileNurse from "./pages/Nurse/Profile/Edit/UpdateUserProfile";

// Parent pages
import ParentHome from "./pages/Parent/ParentHome";
import ParentAppointmentList from "./pages/Parent/Appointment/AppointmentList/AppointmentList";
import ParentAppointmentForm from "./pages/Parent/Appointment/AppointmentForm/AppointmentForm";
import ParentAppointmentHistory from "./pages/Parent/Appointment/AppointmentHistory/AppointmentHistory";
import ParentCalenderAppointment from "./pages/Parent/Appointment/CalenderAppointment/CalenderAppointmentNurse";
import ParentHealthDeclaration from "./pages/Parent/HealthDeclaration/DeclaretionForm/DeclaretionForm";
import ParentDeclarationDetail from "./pages/Parent/HealthDeclaration/DeclarationDetail/DeclarationDetail";
import ParentMyChildren from "./pages/Parent/HealthDeclaration/MyChildren/MyChildren";
import ParentCreateMedicalRegistration from "./pages/Parent/MedicalRegistration/CreateMedicalRes/CreateMedicalResForm";
import ParentMedicalRegistrationList from "./pages/Parent/MedicalRegistration/MediacalRegistrationList/MedicalRegistrationList";
import ParentDetailMedicalRegistration from "./pages/Parent/MedicalRegistration/DetailMedicalRes/DetailMediacalRes";
import ParentNotification from "./pages/Parent/Notification/Notification";
import UserProfile from "./pages/Parent/Profile/User/UserProfile";
import UpdateUserProfile from "./pages/Parent/Profile/Edit/UpdateUserProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (role && userId) {
      dispatch(setUserInfo({role, userId}));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Trang chung cho tất cả user */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="resources" element={<Resources />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          {/* Route dành cho Parent */}
          <Route
            path="parent"
            element={
              <ProtectedRoute allowedRoles={["parent"]}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ParentHome />} />
            <Route
              path="appointments-list"
              element={<ParentAppointmentList />}
            />
            <Route
              path="appointment-form"
              element={<ParentAppointmentForm />}
            />
            <Route
              path="appointment-history"
              element={<ParentAppointmentHistory />}
            />
            <Route
              path="calender-appointment"
              element={<ParentCalenderAppointment />}
            />
            <Route
              path="health-declaration"
              element={<ParentHealthDeclaration />}
            />
            <Route
              path="health-declaration/my-children"
              element={<ParentMyChildren />}
            />
            <Route
              path="health-declaration/detail"
              element={<ParentDeclarationDetail />}
            />
            <Route
              path="medical-registration/create"
              element={<ParentCreateMedicalRegistration />}
            />
            <Route
              path="medical-registration/list"
              element={<ParentMedicalRegistrationList />}
            />
            <Route
              path="medical-registration/detail"
              element={<ParentDetailMedicalRegistration />}
            />
            <Route path="notification" element={<ParentNotification />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="profile/update" element={<UpdateUserProfile />} />
          </Route>
        </Route>

        {/* Route dành cho Admin và Manager */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          {/* Chỉ admin mới được vào AccountManagement */}
          <Route
            path="account-management/create-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="account-management/list-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ListUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="account-management/edit-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditUser />
              </ProtectedRoute>
            }
          />
          {/* Các route còn lại cho cả admin và manager */}
          <Route path="campaign/campaign-list" element={<CampaignList />} />
          <Route path="campaign/create-campaign" element={<CreateCampaign />} />
          <Route path="campaign/detail-campaign" element={<DetailCampaign />} />
          <Route
            path="campaign/history-campaign"
            element={<HistoryCampaign />}
          />
          <Route
            path="student-management/add-student"
            element={<AddStudent />}
          />
          <Route
            path="student-management/student-list"
            element={<StudentList />}
          />
          <Route path="profile" element={<UserProfileAdmin />} />
          <Route path="profile/update" element={<UpdateUserProfileAdmin />} />
        </Route>

        {/* Route dành cho Nurse */}
        <Route
          path="nurse"
          element={
            <ProtectedRoute allowedRoles={["nurse"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<NurseDashboard />} />
          <Route
            path="appointment-management/appointment-list"
            element={<AppointmentList />}
          />
          <Route
            path="appointment-management/appointment-detail"
            element={<AppointmentDetail />}
          />
          <Route
            path="campaign/campaign-list"
            element={<NurseCampaignList />}
          />
          <Route
            path="campaign/detail-campaign"
            element={<NurseDetailCampaign />}
          />
          <Route
            path="campaign/history-campaign"
            element={<NurseHistoryCampaign />}
          />
          <Route path="campaign/record-form" element={<RecordForm />} />
          <Route
            path="medical-event/create-medical-event"
            element={<CreateMedicalEvent />}
          />
          <Route
            path="medical-event/medical-event-list"
            element={<MedicalEventList />}
          />
          <Route path="profile" element={<UserProfileNurse />} />
          <Route path="profile/update" element={<UpdateUserProfileNurse />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
