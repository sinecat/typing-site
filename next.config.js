const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = () => {
    const plugins = [withBundleAnalyzer, withNextIntl];
    return plugins.reduce((acc, next) => next(acc), nextConfig);
};