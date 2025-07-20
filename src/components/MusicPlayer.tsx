import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Shuffle, 
  Repeat,
  Heart,
  MoreHorizontal 
} from "lucide-react";
import tallAnimatedArtwork from "@/assets/tall_animated_artwork.mp4";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  artwork: string;
}

const demoSongs: Song[] = [
  {
    id: 1,
    title: "Issues",
    artist: "Julia Michaels",
    album: "Nervous System",
    duration: "2:58",
    artwork: tallAnimatedArtwork
  },
  {
    id: 2,
    title: "Heaven",
    artist: "Julia Michaels",
    album: "Inner Monologue Part 1",
    duration: "3:22",
    artwork: tallAnimatedArtwork
  },
  {
    id: 3,
    title: "Anxiety",
    artist: "Julia Michaels ft. Selena Gomez",
    album: "Inner Monologue Part 1", 
    duration: "3:26",
    artwork: tallAnimatedArtwork
  },
  {
    id: 4,
    title: "What a Time",
    artist: "Julia Michaels ft. Niall Horan",
    album: "Inner Monologue Part 1",
    duration: "3:04",
    artwork: tallAnimatedArtwork
  },
  {
    id: 5,
    title: "Little Did I Know",
    artist: "Julia Michaels",
    album: "Nervous System",
    duration: "3:15",
    artwork: tallAnimatedArtwork
  },
  {
    id: 6,
    title: "All Your Exes",
    artist: "Julia Michaels",
    album: "Not in Chronological Order",
    duration: "2:45",
    artwork: tallAnimatedArtwork
  }
];

export const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(demoSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([23]);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen bg-player-background text-foreground">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        
        {/* Album Art Section */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="relative">
            {/* Main Album Artwork */}
            <div className="relative overflow-hidden rounded-3xl">
              <video
                src={currentSong.artwork}
                autoPlay
                loop
                muted
                playsInline
                className="w-80 h-96 lg:w-96 lg:h-[30rem] object-cover shadow-2xl"
                style={{ aspectRatio: '3/4' }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Song Info & Controls Section */}
        <div className="max-w-md w-full space-y-8">
          
          {/* Song Information */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {currentSong.title}
              </h1>
              <p className="text-lg text-muted-foreground">{currentSong.artist}</p>
              <p className="text-base text-muted-foreground">{currentSong.album}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="rounded-full"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0:54</span>
              <span>{currentSong.duration}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-6 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Shuffle className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="lg" className="rounded-full">
              <SkipBack className="w-6 h-6" />
            </Button>
            
            <Button 
              onClick={togglePlay}
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
            
            <Button variant="ghost" size="lg" className="rounded-full">
              <SkipForward className="w-6 h-6" />
            </Button>
            
            <Button variant="ghost" size="sm" className="rounded-full">
              <Repeat className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="p-8 border-t border-border/20">
        <h2 className="text-2xl font-bold mb-6">Up Next</h2>
        <div className="grid gap-3">
          {demoSongs.slice(1).map((song, index) => (
            <Card 
              key={song.id}
              className="p-4 bg-player-card/50 backdrop-blur-sm border-border/20 hover:bg-player-card/80 transition-all duration-300 cursor-pointer group"
              onClick={() => setCurrentSong(song)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <video
                    src={song.artwork}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-primary transition-colors duration-300">
                    {song.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                <span className="text-sm text-muted-foreground">{song.duration}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};