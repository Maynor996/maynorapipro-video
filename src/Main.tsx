import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from 'remotion';
import { SceneIntro } from './SceneIntro';
import { SceneFeatures } from './SceneFeatures';
import { SceneAdvantages } from './SceneAdvantages';
import { SceneCTA } from './SceneCTA';

export type MainProps = {
  title: string;
  subTitle: string;
  features: string[];
  advantages: string[];
};

export const Main: React.FC<MainProps> = ({ title, subTitle, features, advantages }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // Scene durations (in frames)
  const transitionFrames = 30; // 1s
  const introDuration = 150; // 5s
  const featuresDuration = 240; // 8s
  const advantagesDuration = 240; // 8s
  const ctaDuration = 300; // 10s
  
  // Scene Start Times
  const introStart = 0;
  const featuresStart = introStart + introDuration;
  const advantagesStart = featuresStart + featuresDuration;
  const ctaStart = advantagesStart + advantagesDuration;

  const getOpacity = (start: number, duration: number) => {
    return interpolate(
      frame,
      [start, start + transitionFrames, start + duration - transitionFrames, start + duration],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <Sequence from={introStart} durationInFrames={introDuration}>
        <div style={{ opacity: getOpacity(introStart, introDuration), width: '100%', height: '100%' }}>
          <SceneIntro title={title} subTitle={subTitle} />
          <Audio src={staticFile('audio/scene1.mp3')} />
        </div>
      </Sequence>
      
      <Sequence from={featuresStart} durationInFrames={featuresDuration}>
        <div style={{ opacity: getOpacity(featuresStart, featuresDuration), width: '100%', height: '100%' }}>
          <SceneFeatures features={features} />
          <Audio src={staticFile('audio/scene2.mp3')} />
        </div>
      </Sequence>
      
      <Sequence from={advantagesStart} durationInFrames={advantagesDuration}>
        <div style={{ opacity: getOpacity(advantagesStart, advantagesDuration), width: '100%', height: '100%' }}>
          <SceneAdvantages advantages={advantages} />
          <Audio src={staticFile('audio/scene3.mp3')} />
        </div>
      </Sequence>
      
      <Sequence from={ctaStart} durationInFrames={ctaDuration}>
        <div style={{ opacity: interpolate(frame, [ctaStart, ctaStart + transitionFrames], [0, 1], { extrapolateLeft: 'clamp' }), width: '100%', height: '100%' }}>
          <SceneCTA />
          <Audio src={staticFile('audio/scene4.mp3')} />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
