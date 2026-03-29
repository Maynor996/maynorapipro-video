import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  
  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  
  const subtitleSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  
  const urlSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  
  const titleTranslate = interpolate(titleSpring, [0, 1], [50, 0]);
  const subtitleTranslate = interpolate(subtitleSpring, [0, 1], [30, 0]);
  const urlTranslate = interpolate(urlSpring, [0, 1], [30, 0]);
  
  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#007bff',
      padding: '40px'
    }}>
      <div style={{
        textAlign: 'center',
        transform: `translateY(${titleTranslate}px)`,
        opacity: titleSpring,
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '84px',
          fontWeight: '900',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          MaynorAPI Pro
        </h1>
        <div style={{
          fontSize: '48px',
          fontWeight: '500',
          marginBottom: '80px',
          transform: `translateY(${subtitleTranslate}px)`,
          opacity: subtitleSpring
        }}>
          开启您的 AI 极致之旅
        </div>
      </div>
      
      <div style={{
        transform: `translateY(${urlTranslate}px)`,
        opacity: urlSpring,
        backgroundColor: 'white',
        padding: '30px 60px',
        borderRadius: '100px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          fontSize: '56px',
          fontWeight: '900',
          color: '#007bff',
          letterSpacing: '2px'
        }}>
          apipro.maynor1024.live
        </div>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '80px',
        fontSize: '32px',
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '500'
      }}>
        100% 官方正版接口 • 极速稳定 • 无月费
      </div>
    </AbsoluteFill>
  );
};
