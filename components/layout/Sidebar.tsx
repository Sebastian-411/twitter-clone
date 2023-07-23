import { BsHouseFill, BsBellFill} from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';


const Sidebar = () => {
    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/notificactions',
            icon: BsBellFill 
        },
        {
            label: 'Profile',
            href: '/notifications',
            icon: FaUser
        }
    ];
    return ( 
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem 
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        icon={item.icon} 
                        />
                    ))}
                    <SidebarItem onClick={() => {}} icon={BiLogOut} label="Log Out"/>
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;
