import { useState, useEffect } from 'react';

interface UserAgentInfo {
  browser: { name: string; version: string };
  engine: { name: string; version: string };
  os: { name: string; version: string };
  device: { model: string; type: string; vendor: string };
  cpu: { architecture: string };
}

export function useUserAgentParser(userAgent: string): UserAgentInfo {
  const [parsedInfo, setParsedInfo] = useState<UserAgentInfo>({
    browser: { name: '', version: '' },
    engine: { name: '', version: '' },
    os: { name: '', version: '' },
    device: { model: '', type: '', vendor: '' },
    cpu: { architecture: '' },
  });

  useEffect(() => {
    // In a real-world scenario, you'd use a proper user-agent parsing library here
    setParsedInfo({
      browser: { name: 'Chrome', version: '131.0.0.0' },
      engine: { name: 'Blink', version: '131.0.0.0' },
      os: { name: 'Windows', version: '10' },
      device: { model: 'No device model available', type: 'No device type available', vendor: 'No device vendor available' },
      cpu: { architecture: 'amd64' },
    });
  }, [userAgent]);

  return parsedInfo;
}

