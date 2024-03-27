import { useState } from 'react';
// import './styles/settings.css';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Web developer | Tech enthusiast',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
    },
    appearance: {
      darkMode: false,
      fontSize: 'medium',
    },
    security: {
      changePassword: false,
      twoFactorAuth: false,
    },
  });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      profile: {
        ...prevSettings.profile,
        [name]: value,
      },
    }));
  };

  const toggleSetting = (category, setting) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [setting]: !prevSettings[category][setting],
      },
    }));
  };

  return (
    <div className="settings-page">
      <h2 className='settings-title'>Settings</h2>

      {/* Profile Settings */}
      <div className="settings-category">
        <h3>Profile</h3>
        <div className="setting">
          <label>Name</label>
          <input
            type="text"
            value={settings.profile.name}
            name="name"
            onChange={handleProfileChange}
          />
        </div>
        <div className="setting">
          <label>Email</label>
          <input
            type="email"
            value={settings.profile.email}
            name="email"
            onChange={handleProfileChange}
          />
        </div>
        <div className="setting">
          <label>Bio</label>
          <textarea
            value={settings.profile.bio}
            name="bio"
            onChange={handleProfileChange}
          ></textarea>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="settings-category">
        <h3>Notifications</h3>
        <div className="setting">
          <label>
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={() => toggleSetting('notifications', 'emailNotifications')}
            />
            Email Notifications
          </label>
        </div>
        <div className="setting">
          <label>
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={() => toggleSetting('notifications', 'pushNotifications')}
            />
            Push Notifications
          </label>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="settings-category">
        <h3>Appearance</h3>
        <div className="setting">
          <label>
            <input
              type="checkbox"
              checked={settings.appearance.darkMode}
              onChange={() => toggleSetting('appearance', 'darkMode')}
            />
            Dark Mode
          </label>
        </div>
        <div className="setting">
          <label>Font Size</label>
          <select
            value={settings.appearance.fontSize}
            onChange={(e) => setSettings(prevSettings => ({
              ...prevSettings,
              appearance: {
                ...prevSettings.appearance,
                fontSize: e.target.value,
              },
            }))}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      {/* Security Settings */}
      <div className="settings-category">
        <h3>Security</h3>
        <div className="setting">
          <label>
            <input
              type="checkbox"
              checked={settings.security.changePassword}
              onChange={() => toggleSetting('security', 'changePassword')}
            />
            Change Password
          </label>
        </div>
        <div className="setting">
          <label>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={() => toggleSetting('security', 'twoFactorAuth')}
            />
            Two-Factor Authentication
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
