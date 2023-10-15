import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AvatarSmall } from "../components/AvatarSmall";

export const UserProfile = () => {
  const [user, setUser] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  const { id } = useParams();

  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  const fetchUser = async () => {
    const req = await fetch('http://localhost:3000/user/' + id);
    const res = await req.json()
    setUser(res);
    const imageUrl = arrayBufferToBase64(res.avatar.data.data);
    setAvatarUrl('data:image/jpeg;base64,' + imageUrl);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  if (!user) {
    return (
      <>
        Loading...
      </>
    )
  }

  return (
    <>
      <div>{user.name}</div>
      <div>{user.status}</div>
      <AvatarSmall imageUrl={avatarUrl} />
    </>
  )
}