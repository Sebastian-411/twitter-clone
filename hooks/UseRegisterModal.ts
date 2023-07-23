import { create } from 'zustand';

interface UseRegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const UseRegisterModal = create<UseRegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default UseRegisterModal;