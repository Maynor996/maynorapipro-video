import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';

export type SceneFeaturesProps = {
  features: string[];
};

export const SceneFeatures: React.FC<SceneFeaturesProps> = ({ features }) => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const imgTranslate = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 60 },
  });
  
  const translateY = interpolate(imgTranslate, [0, 1], [100, 0]);
  
  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: '40px'
    }}>
      <div style={{
        textAlign: 'center',
        opacity: titleOpacity,
        marginBottom: '60px'
      }}>
        <h2 style={{
          fontSize: '64px',
          fontWeight: '900',
          color: '#1a202c',
          marginBottom: '20px'
        }}>
          300+ 全球顶级模型聚合
        </h2>
        <div style={{
          fontSize: '36px',
          color: '#4a5568',
        }}>
          一站式接入 OpenAI, Claude, Gemini, DeepSeek...
        </div>
      </div>
      
      <div style={{ 
        transform: `translateY(${translateY}px)`,
        opacity: imgTranslate,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Img 
          src={staticFile('models.png')} 
          style={{ width: '900px', height: 'auto', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }} 
        />
      </div>
      
      <div style={{
        marginTop: '60px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '30px',
        width: '80%'
      }}>
        {features.map((feature, i) => {
          const itemSpring = spring({
            frame: frame - 60 - i * 15,
            fps,
            config: { damping: 10, stiffness: 80 },
          });
          
          return (
            <div 
              key={i}
              style={{
                background: '#f7fafc',
                padding: '30px',
                borderRadius: '16px',
                border: '2px solid #edf2f7',
                fontSize: '40px',
                fontWeight: '700',
                color: '#2d3748',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                opacity: itemSpring,
                transform: `translateX(${interpolate(itemSpring, [0, 1], [30, 0])}px)`
              }}
            >
              <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#007bff' }} />
              {feature}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
