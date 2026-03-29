import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';

export type SceneIntroProps = {
  title: string;
  subTitle: string;
};

export const SceneIntro: React.FC<SceneIntroProps> = ({ title, subTitle }) => {
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
  
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const titleTranslate = interpolate(titleSpring, [0, 1], [50, 0]);
  const subtitleTranslate = interpolate(subtitleSpring, [0, 1], [30, 0]);
  
  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f7ff',
      padding: '40px'
    }}>
      <div style={{ opacity: logoOpacity, marginBottom: '60px' }}>
        <Img 
          src={staticFile('apipro_top.png')} 
          style={{ width: '800px', height: 'auto', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
        />
      </div>
      
      <div style={{
        textAlign: 'center',
        transform: `translateY(${titleTranslate}px)`,
        opacity: titleSpring
      }}>
        <h1 style={{
          fontSize: '72px',
          fontWeight: '900',
          color: '#007bff',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          {title}
        </h1>
        <div style={{
          fontSize: '48px',
          fontWeight: '500',
          color: '#4a5568',
          transform: `translateY(${subtitleTranslate}px)`,
          opacity: subtitleSpring
        }}>
          {subTitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
