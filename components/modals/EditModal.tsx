import useCurrentUser from "@/hooks/UseCurrentUser";
import useEditModal from "@/hooks/UseEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";

const EditModal = () => {
    const {data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

    const editModal = useEditModal();

    const [profileImage, setProfileImage ] = useState('');
    const [coverImage, setCoverImage ] = useState('');
    const [name, setName ] = useState('');
    const [username, setUsername ] = useState('');
    const [bio, setBio ] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            
            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            mutateFetchedUser();

            toast.success('Update');

            editModal.onClose();
        } catch (error) {
            toast.error('Something went wrong')    
        } finally {
            setIsLoading(false);
        }
    },[editModal, mutateFetchedUser, name, username, bio, profileImage, coverImage]);
    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser]);
    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            tittle="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            
        /> 
    );
}
 
export default EditModal;