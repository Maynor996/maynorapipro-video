import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export type SceneAdvantagesProps = {
  advantages: string[];
};

export const SceneAdvantages: React.FC<SceneAdvantagesProps> = ({ advantages }) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const advantagesSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 60 },
  });
  
  const translateY = interpolate(advantagesSpring, [0, 1], [50, 0]);
  
  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: '40px'
    }}>
      <div style={{
        textAlign: 'center',
        opacity: titleOpacity,
        marginBottom: '60px'
      }}>
        <h2 style={{
          fontSize: '72px',
          fontWeight: '900',
          color: '#1a202c',
          marginBottom: '20px'
        }}>
          极度稳定，极致性价比
        </h2>
        <div style={{
          fontSize: '40px',
          color: '#4a5568',
        }}>
          18个月稳定运营，连接全球顶尖 AI 模型
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        width: '80%'
      }}>
        {advantages.map((advantage, i) => {
          const itemSpring = spring({
            frame: frame - 30 - i * 15,
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          
          return (
            <div 
              key={i}
              style={{
                background: 'white',
                padding: '40px',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                fontSize: '48px',
                fontWeight: '700',
                color: '#2d3748',
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                opacity: itemSpring,
                transform: `translateX(${interpolate(itemSpring, [0, 1], [100, 0])}px)`
              }}
            >
              <div style={{ 
                fontSize: '64px',
                color: '#007bff',
                width: '80px',
                textAlign: 'center'
              }}>
                ✓
              </div>
              {advantage}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
