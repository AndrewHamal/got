export const HoteladminSidebarMenus = [
    {
        title: "Dashboard",
        link: "/hoteladmin",
        icon: "/admin/img/menu-icon/7.svg"
    },
    {
        title: "My Hotel",
        link: "/hoteladmin/hotel/update",
        icon: "/admin/img/menu-icon/7.svg"
    },
    {
        title: "Hotel Room",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Create",
                link: "/hoteladmin/room/create"
            },
            {
                title: "Listing",
                link: "/hoteladmin/room"
            },
        ]
    },
    {
        title: "Bookings",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Current Rooms",
                link: "/hoteladmin/current"
            },
            {
                title: "History",
                link: "/hoteladmin/bookings"
            },
        ]
    },
    {
        title: "Gallery",
        link: "/hoteladmin/gallery",
        icon: "/admin/img/menu-icon/7.svg"
    },
]