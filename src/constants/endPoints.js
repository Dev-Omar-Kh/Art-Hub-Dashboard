export const endpoints = {

    authentication: {
        login: '/admin/login'
    },

    home: {
        statistics: '/dashboard/statistics',
        analysis: '/dashboard/charts',
        topArtists: '/dashboard/artists/performance',
        overView: '/dashboard/overview',
    },

    users: {
        getUsers: '/admin/users',
        sendMessage: 'send-message',
    },

    admins: {
        getAdmins: '/admin/admins',
        profile: '/admin/profile',
    },

    orders: {
        getOrders: '/admin/orders',
    },

    rates: {
        getRates: '/admin/reviews',
    },

    reports: {
        getReports: '/admin/reports',
    },

    salesAnalysis: {
        getStatistics: '/dashboard/sales/analytics',
        topArtists: '/dashboard/sales/top-artists',
        trendData: '/dashboard/sales/trends',
        comprehensive: '/dashboard/sales/comprehensive',
    },

    artist: {
        baseLink: '/admin/artists',
        getWorks: 'artworks',
        reports: 'reports',
        reviews: 'reviews',
        logs: 'activity',
        info: 'info',
    },

    client: {
        baseLink: '/admin/users',
        reviews: 'reviews',
        orders: 'orders',
        logs: 'activity',
    }

}