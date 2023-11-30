import { Breadcrumb } from "../components/Breadcrumb";

const Profile = () => {

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const occupation = localStorage.getItem("occupation");
  return (
    <>
    <Breadcrumb pageName="Profile"></Breadcrumb>
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">First name</dt>
          <dd className="text-gray-700 sm:col-span-2">{firstName}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Last name</dt>
          <dd className="text-gray-700 sm:col-span-2">{lastName}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Email</dt>
          <dd className="text-gray-700 sm:col-span-2">{email}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Occupation</dt>
          <dd className="text-gray-700 sm:col-span-2">{occupation}</dd>
        </div>


      </dl>
    </div>
    </>
  );
};

export default Profile;
