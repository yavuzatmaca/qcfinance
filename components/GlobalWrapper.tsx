import { getAlertConfig } from '@/app/site-config';

export default async function GlobalWrapper({ children }: { children: React.ReactNode }) {
  const alert = getAlertConfig();

  // Alert color mapping
  const alertColors = {
    info: 'bg-blue-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
    success: 'bg-green-600'
  };

  return (
    <>
      {/* Alert Banner */}
      {alert.isActive && alert.message && (
        <div className={`${alertColors[alert.type]} text-white px-4 py-3 text-center`}>
          <p className="text-sm font-medium">{alert.message}</p>
        </div>
      )}

      {children}
    </>
  );
}

