export const SuperadminSidebarMenus = [
    {
        title: "Dashboard",
        link: "/superadmin",
        icon: "fas fa-tachometer-alt"
    },
    {
        title: "Profile",
        link: "/superadmin/profile",
        icon: "fa fa-user-cog"
    },
    {
        title: "Location",
        parent: true,
        icon: "fas fa-globe",
        children: [
            {
                title: "Country",
                link: "/superadmin/miscs/country"
            },
            {
                title: "Region",
                link: "/superadmin/miscs/region"
            },
        ]
    },
    {
        title: "Destinations",
        parent: true,
        icon: "fas fa-map-pin",
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
        title: "Itinerary",
        parent: true,
        icon: "fas fa-road",
        children: [
            {
                title: "Create",
                link: "/superadmin/itinerary/create"
            },
            {
                title: "Listing",
                link: "/superadmin/itinerary"
            },
        ]
    },
    {
        title: "Packages",
        parent: true,
        icon: "fas fa-box-open",
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
        title: "Essential Gears",
        parent: true,
        icon: "fa fa-file-alt",
        children: [
            {
                title: "Create",
                link: "/superadmin/essential-gear/create"
            },
            {
                title: "Listing",
                link: "/superadmin/essential-gear"
            },
        ]
    },
    {
        title: "Contacts",
        parent: true,
        icon: "fas fa-envelope",
        children: [
            {
                title: "Booking",
                link: "/superadmin/contact/package-booking"
            },
            {
                title: "Contact Us",
                link: "/superadmin/contact/contact"
            }
        ]
    },
    {
        title: "Blogs",
        parent: true,
        icon: "fas fa-blog",
        children: [
            {
                title: "Create",
                link: "/superadmin/blogs/create"
            },
            {
                title: "Listing",
                link: "/superadmin/blogs"
            },
            {
                title: "Categories",
                link: "/superadmin/blogs/categories"
            },
        ]
    },
    {
        title: "Customize Trip",
        parent: true,
        icon: "fas fa-mountain",
        children: [
            {
                title: "Listing",
                link: "/superadmin/customize-trip"
            },
        ]
    },
    {
        title: "CMS",
        parent: true,
        icon: "fas fa-bars",
        children: [
            {
                title: "Videos",
                link: "/superadmin/miscs/videos"
            },
            {
                title: "Team",
                link: "/superadmin/miscs/team"
            },
            {
                title: "Partners",
                link: "/superadmin/miscs/partners"
            },
        ]
    },
    // {
    //     title: "FAQ",
    //     parent: true,
    //     icon: "fas fa-question",
    //     children: [
    //         {
    //             title: "Create",
    //             link: "/superadmin/faq/create"
    //         },
    //         {
    //             title: "Listing",
    //             link: "/superadmin/faq"
    //         },
    //     ]
    // }
]