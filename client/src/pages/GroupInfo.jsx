import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AvatarBig } from "../components/AvatarBig";
import { AvatarSmall } from "../components/AvatarSmall";
import { AvatarVerySmall } from "../components/AvatarVerySmall";
import { MediaThumbnail } from "../components/MediaThumbnail";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";


export const GroupInfo = () => {
  const [group, setGroup] = useState();
  const [media, setMedia] = useState();
  const { id } = useParams();

  const fetchGroup = async () => {
    const req = await fetch('http://localhost:3000/group/' + id);
    //const req = await fetch('https://textera-production.up.railway.app/group/' + id);
    const res = await req.json()
    setGroup(res);
    // Fetch media
    const mediaReq = await fetch('http://localhost:3000/messages/group/' + id + '/media');
    //const mediaReq = await fetch('https://textera-production.up.railway.app/messages/group/' + id + '/media');
    const mediaRes = await mediaReq.json();
    setMedia(mediaRes);
  }

  useEffect(() => {
    fetchGroup();
  }, [])

  if (!group || !media) {
    return (
        <Layout>
          <div>
            Loading...
          </div>
        </Layout>
    )
  }

  const MediaList = () => {
    if (media.length === 0) {
      return (
        <div>
          No media
        </div>
      )
    }

    return (
      <div className="group_media-list">
        {
          media.map((el) => {
            return (
              <MediaThumbnail imageUrl={el.file} key={el._id} />
            )
          })
        }
      </div>
    )
  }

  return (
      <Layout>
        <div className="content group-info">
          <AvatarBig imageUrl={group.image} />
          <div className="group-name">{group.title}</div>
          <div>
            <Link to={'/user/' + group.admin._id} className="admin">
              <strong>Admin:</strong> <AvatarVerySmall imageUrl={group.admin.avatar} /> {group.admin.username}
            </Link>
          </div>
          <div className="group_users-list">
            <div className="group-info_section">{group.users.length} members</div>
            <div>
              {
                group.users.map((el) => {
                  return (
                    <Link to={`/user/${el._id}`} key={el._id} className="group_user">
                      <AvatarSmall imageUrl={el.avatar} />
                      <div>
                        {el.username}
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
          <div className="group_media-section">
            <div className="group-info_section">Media</div>
            <MediaList />
            
          </div>
        </div>
      </Layout>
  )
}