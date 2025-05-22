import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-100 pt-20 pb-8">
      <div className="max-w-md mx-auto p-4 sm:p-6">
        <div className="bg-base-300 rounded-xl p-4 sm:p-6 space-y-6">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-400">Your profile information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || '/avatar.png'}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 sm:border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-base-content hover:scale-105 p-1 sm:p-2 
                  rounded-full cursor-pointer transition-all duration-200
                  ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}
                `}
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to update your photo'}
            </p>
          </div>

          {/* Personal Info */}
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <div className="flex items-center gap-2 text-zinc-400 mb-1">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </div>
              <p className="px-3 py-2 bg-base-200 rounded-lg border truncate">
                {authUser?.fullName}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-zinc-400 mb-1">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </div>
              <p className="px-3 py-2 bg-base-200 rounded-lg border truncate">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-base-100 rounded-xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-medium mb-3">Account Information</h2>
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split('T')[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
