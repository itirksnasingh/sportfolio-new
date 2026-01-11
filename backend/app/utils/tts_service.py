import io
import os
from gtts import gTTS

class TTSService:
    """Text-to-Speech Service using gTTS"""
    
    # Language codes for gTTS
    LANGUAGES = {
        "en": "en",     # English
        "hi": "hi",     # Hindi
        "mr": "mr",     # Marathi
        "es": "es",     # Spanish
        "fr": "fr",     # French
    }
    
    def __init__(self, language="en"):
        """Initialize TTS service with specified language"""
        self.language = language
        if language not in self.LANGUAGES:
            raise ValueError(f"Unsupported language: {language}")
        print(f"✅ TTS Service initialized for language: {language}")
    
    def text_to_speech(self, text, slow=False):
        """
        Convert text to speech
        
        Args:
            text (str): Text to convert
            slow (bool): Slow speech speed
            
        Returns:
            io.BytesIO: Audio file in memory
        """
        try:
            if not text or not text.strip():
                raise ValueError("Text cannot be empty")
            
            # Create TTS object
            tts = gTTS(text=text, lang=self.LANGUAGES[self.language], slow=slow)
            
            # Save to BytesIO object
            audio_fp = io.BytesIO()
            tts.write_to_fp(audio_fp)
            audio_fp.seek(0)
            
            return audio_fp
            
        except Exception as e:
            print(f"❌ TTS conversion error: {e}")
            raise Exception(f"Failed to convert text to speech: {str(e)}")
    
    def save_audio_file(self, text, output_path, slow=False):
        """
        Convert text to speech and save to file
        
        Args:
            text (str): Text to convert
            output_path (str): Path to save audio file
            slow (bool): Slow speech speed
            
        Returns:
            str: Path to saved file
        """
        try:
            tts = gTTS(text=text, lang=self.LANGUAGES[self.language], slow=slow)
            tts.save(output_path)
            print(f"✅ Audio saved to: {output_path}")
            return output_path
        except Exception as e:
            print(f"❌ TTS save error: {e}")
            raise Exception(f"Failed to save audio: {str(e)}")
    
    @staticmethod
    def get_supported_languages():
        """Get list of supported languages"""
        return list(TTSService.LANGUAGES.keys())
    
    def change_language(self, language):
        """Change the TTS language"""
        if language not in self.LANGUAGES:
            raise ValueError(f"Unsupported language: {language}")
        
        self.language = language
        print(f"✅ TTS language changed to: {language}")
