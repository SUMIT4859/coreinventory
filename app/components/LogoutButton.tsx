"use client";

export default function LogoutButton(){

const logout = () => {

  document.cookie =
    "loggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

  window.location.href = "/";
};


  return (
    <button
      onClick={logout}
      style={{
        marginTop: 30,
        padding: 10,
        width: "100%",
        cursor: "pointer"
      }}
    >
      Logout
    </button>
  );
}