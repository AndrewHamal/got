export const SuperadminSidebarMenus = [
    {
        title: "Dashboard",
        link: "/superadmin",
        icon: "/admin/img/menu-icon/7.svg"
    },
    {
        title: "Blogs",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Create",
                link: "/superadmin/blogs/create"
            },
            {
                title: "Listing",
                link: "/superadmin/blogs"
            },
        ]
    },
    {
        title: "Destinations",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Create",
                link: "/superadmin/destinations/create"
            },
            {
                title: "Listing",
                link: "/superadmin/destinations"
            },
        ]
    },
    {
        title: "Itenary",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Create",
                link: "/superadmin/itenary/create"
            },
            {
                title: "Listing",
                link: "/superadmin/itenary"
            },
        ]
    },
    {
        title: "Packages",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Create",
                link: "/superadmin/packages/create"
            },
            {
                title: "Listing",
                link: "/superadmin/packages"
            },
        ]
    },
    {
        title: "FAQ",
        parent: true,
        icon: "/admin/img/menu-icon/7.svg",
        children: [
            {
                title: "Create",
                link: "/superadmin/faq/create"
            },
            {
                title: "Listing",
                link: "/superadmin/faq"
            },
        ]
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