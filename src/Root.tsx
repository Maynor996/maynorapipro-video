import { Composition } from 'remotion';
import { Main } from './Main';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={930} // 31s total (5+8+8+10)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "MaynorAPI Pro",
          subTitle: "解锁未来之门！最专业的接口聚合",
          features: [
            "100% 官方企业渠道",
            "300+ 全球顶级模型",
            "18个月持续稳定",
            "极致响应 (12ms)"
          ],
          advantages: [
            "低至 1.2 元 / 刀",
            "注册即送体验额度",
            "按量计费，无月费",
            "不限速官方高速通道"
          ]
        }}
      />
    </>
  );
};
