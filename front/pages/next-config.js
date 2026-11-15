module.exports = {
    reactStrinctMode: true,
    async rewrites() {
        return [{ sourse: '/api/:path*', destination: 'https://localhost:3001/api/:path*'}];
    },
};