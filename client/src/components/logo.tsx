import javlinLogo from "@assets/image_1750817188897.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-lg overflow-hidden logo-energy`}>
        <img 
          src={javlinLogo} 
          alt="Javlin.ai" 
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold text-gradient-javlin`}>Javlin</span>
      )}
    </div>
  );
}
