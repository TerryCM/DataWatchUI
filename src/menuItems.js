import { Home as HomeIcon, Help as HelpIcon, Lock as LockIcon } from "@material-ui/icons"
import { ForumIcon, LearnIcon, CalendarIcon, PoliciesIcon, WikiIcon, CloudIcon, VideoIcon } from "./components/icons"

const menuItems = [
    {
        label: 'Home',
        icon: <HomeIcon fontSize="large" />,
        path: '/home',
        items: []
    },

    {
    label: 'Listeners',
    icon: <HomeIcon  size={1.5} />,
    path: '/listeners',
    items: [],
    },
    {
        label: 'Help',
        icon: <HelpIcon fontSize="large" />,
        path: '/help',
        items: [
            {
                category: 'learn',
                label: 'Platform Guide',
                path: 'https://learning.cyverse.org',
                description:
                    'Learn more about CyVerse Continuous Cloud using the platform guide.',
                icon: <CloudIcon />,
            },
            {
                category: 'learn',
                label: 'Webinars',
                path: 'https://learning.cyverse.org/en/latest/webinars.html',
                description:
                    'View Focus Forum webinars about CyVerse Continuous Cloud.',
                icon: <VideoIcon />,
            },
            {
                category: 'learn',
                label: 'Learning Center',
                path: 'https://learning.cyverse.org/en/latest/tutorials.html',
                description:
                    'Explore our learning materials in the popular “Read the Docs” formatting.',
                icon: <LearnIcon />,
            },

            {
                category: 'support',
                label: 'Policies',
                path: 'https://cyverse.org/policies',
                description: 'CyVerse policies that apply to all users.',
                icon: <PoliciesIcon />,
            },
            {
                category: 'support',
                label: 'CyVerse Wiki',
                path: 'https://cyverse.atlassian.net/wiki',
                description: 'A space for collaboration.',
                icon: <WikiIcon />,
            },
            {
                category: 'support',
                label: 'FAQ',
                path: 'https://learning.cyverse.org/projects/faq',
                description:
                    'Answers to frequenty asked questions about CyVerse',
                icon: <ForumIcon />,
            },
            {
                category: 'support',
                label: 'Maintenance Calendar',
                path: 'https://cyverse.org/maintenance',
                description: 'Check for scheduled downtime for maintenance.',
                icon: <CalendarIcon />,
            }
        ]
    },
    {
        label: 'Administrative',
        icon: <LockIcon fontSize="large" />,
        path: '/administrative',
        restricted: true,
        items: []
    },
]

const getMenuItem = label => {
    return menuItems.find(item => item.label === label)
}

export { menuItems, getMenuItem }
