const USER_KEY = 'loom_user';

export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

const saveUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const user = {
          id: 'u1',
          name: 'Jane Doe',
          email: email,
          avatar: 'https://i.pravatar.cc/150?u=jane',
          role: 'user',
        };
        saveUser(user);
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

export const register = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email && data.password && data.name) {
        const user = {
          id: `u${Date.now()}`,
          name: data.name,
          email: data.email,
          avatar: `https://i.pravatar.cc/150?u=${data.email}`,
          role: 'user',
        };
        saveUser(user);
        resolve(user);
      } else {
        reject(new Error('Missing required fields'));
      }
    }, 800);
  });
};

export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      saveUser(null);
      resolve();
    }, 300);
  });
};

export const updateProfile = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...data };
        saveUser(updatedUser);
        resolve(updatedUser);
      } else {
        reject(new Error('Not authenticated'));
      }
    }, 500);
  });
};
