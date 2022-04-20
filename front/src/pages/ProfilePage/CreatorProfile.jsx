import React from 'react';
import './UserProfile.css'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileListingItem from "../../components/ProfileListingItem/ProfileListingItem";

const CreatorProfile = () => {

    const userData = useSelector(store => store.user)
    const Listing = useSelector(store => store.catalogItems)

    const creatorListing = Listing.filter(item => item.userId === userData.id)
    console.log('creatorListing ===' , creatorListing[0])


    return (
        <>
            <div className="profileContainer">
                <div className='profileTitle'>My Profile</div>
                <div className="profileContent">
                    <div className="profileInfo">
                        {userData.avatarUrl ? (<img className='avatar' src={'http://localhost:4000/' + userData.avatarUrl + '.jpg'}/>) :
                            (<div className="avatar">{userData.firstName[0] + userData.lastName[0]}</div>)}
                        <div className='profileName'>{userData.firstName} {userData.lastName}</div>
                        <div className='profileEmail'>creator</div>
                        <div className="profileButton">
                            <Link to='/profile/edit'><button className='buttonEdit'>Edit profile</button></Link>
                            {userData.isMaker ? (<Link className='linkButton' to="/profile/maker"><button className='buttonFlag'>
                                <img className='avatarButtonImg' src={'http://localhost:4000/' + 'buttonMaker' + '.png'} alt="ava"/>

                                Maker profile</button></Link>) : null}
                            {userData.isCreator ? (<Link className='linkButton' to="/profile/creator"><button  className='buttonFlag'>
                                <img className='avatarButtonImg' src={'http://localhost:4000/' + 'buttonCreator' + '.png'} alt="ava"/>

                                Creator profile</button></Link>) : null}
                            <button className='buttonLogout'>Log out</button>
                        </div>
                    </div>

                    <div className="profileActions">
                        <div className="actionsNavigations addListing">
                            <div className='actionsItem'>My Listing</div>
                            <Link to='/models/edit'><button className='buttonAdd' >
                                + Add Listing
                            </button></Link>
                        </div>
                        <br/>
                        <div className="actionsItems">
                            {creatorListing.map(item =>
                                <ProfileListingItem item={item} key={item.id}/>
                            )}
                            <ProfileListingItem/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatorProfile;
