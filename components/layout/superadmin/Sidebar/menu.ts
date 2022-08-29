export const SuperadminSidebarMenus = [
    {
        title: "Dashboard",
        link: "/superadmin",
        icon: "/admin/img/menu-icon/7.svg"
    },
    {
        title: "Superadmins",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Create",
                link: "/superadmin/superadmin/create"
            },
            {
                title: "Listing",
                link: "/superadmin/superadmin"
            },
        ]
    },
    {
        title: "Hotel Management",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Create Admin",
                link: "/superadmin/hotels/create"
            },
            {
                title: "Listing",
                link: "/superadmin/hotels"
            },
            {
                title: "Pending Approval",
                link: "/superadmin/hotels/approval"
            },
        ]
    },
]