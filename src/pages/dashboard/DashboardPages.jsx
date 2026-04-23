import React from 'react';

const PlaceholderPage = ({ title }) => (
  <div className="bg-card rounded-xl p-6 border border-border mt-4">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <p className="text-text-secondary">
      This is the internal {title.toLowerCase()} page. Content for this section will be implemented soon.
    </p>
  </div>
);

export const Users = () => <PlaceholderPage title="Users Management" />;
export const ContentManagement = () => <PlaceholderPage title="Content Management" />;
export const DashboardBlog = () => <PlaceholderPage title="Blog Management" />;
export const DashboardServices = () => <PlaceholderPage title="Services Management" />;
export const DashboardPricing = () => <PlaceholderPage title="Pricing Management" />;
export const DashboardPayments = () => <PlaceholderPage title="Payments" />;
export const Notifications = () => <PlaceholderPage title="Notifications" />;
export const Settings = () => <PlaceholderPage title="Settings" />;
