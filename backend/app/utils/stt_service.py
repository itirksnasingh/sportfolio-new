import wave
import json
import io
import tempfile
import os
from vosk import Model, KaldiRecognizer
import soundfile as sf

class STTService:
    """Speech-to-Text Service using Vosk"""
    
    # Model paths (relative to project root)
    MODELS = {
        "en": os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'API_Integration', 'model'),
        "hi": "models/hi",  # Add Hindi model path if available
        "mr": "models/mr"   # Add Marathi model path if available
    }
    
    def __init__(self, language="en"):
        """Initialize STT service with specified language"""
        self.language = language
        self.model_path = self.MODELS.get(language)
        
        if not self.model_path or not os.path.exists(self.model_path):
            raise ValueError(f"Model not found for language: {language}")
        
        try:
            self.model = Model(self.model_path)
            print(f"✅ STT Model loaded for language: {language}")
        except Exception as e:
            print(f"❌ Error loading STT model: {e}")
            raise
    
    def transcribe_audio_file(self, audio_data, sample_rate=16000):
        """
        Transcribe audio from file-like object or bytes
        
        Args:
            audio_data: Audio file bytes or file-like object
            sample_rate: Audio sample rate (default 16000)
            
        Returns:
            str: Transcribed text
        """
        try:
            # Create recognizer
            recognizer = KaldiRecognizer(self.model, sample_rate)
            
            # Convert audio_data to bytes if it's a file-like object
            if hasattr(audio_data, 'read'):
                audio_bytes = audio_data.read()
            else:
                audio_bytes = audio_data
            
            # Save to temporary WAV file
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
                temp_path = temp_file.name
                temp_file.write(audio_bytes)
            
            # Process WAV file
            text_output = []
            
            try:
                with wave.open(temp_path, "rb") as wf:
                    recognizer = KaldiRecognizer(self.model, wf.getframerate())
                    
                    while True:
                        data = wf.readframes(4000)
                        if len(data) == 0:
                            break
                        if recognizer.AcceptWaveform(data):
                            result = json.loads(recognizer.Result())
                            text_output.append(result.get("text", ""))
                    
                    # Get final result
                    final_result = json.loads(recognizer.FinalResult())
                    text_output.append(final_result.get("text", ""))
            finally:
                # Clean up temp file
                if os.path.exists(temp_path):
                    os.unlink(temp_path)
            
            transcribed_text = " ".join(text_output).strip()
            return transcribed_text
            
        except Exception as e:
            print(f"❌ Transcription error: {e}")
            raise Exception(f"Failed to transcribe audio: {str(e)}")
    
    def transcribe_raw_audio(self, audio_bytes, sample_rate=16000):
        """
        Transcribe raw audio bytes
        
        Args:
            audio_bytes: Raw audio data
            sample_rate: Audio sample rate
            
        Returns:
            str: Transcribed text
        """
        try:
            recognizer = KaldiRecognizer(self.model, sample_rate)
            
            if recognizer.AcceptWaveform(audio_bytes):
                result = json.loads(recognizer.Result())
            else:
                result = json.loads(recognizer.FinalResult())
            
            return result.get("text", "")
        except Exception as e:
            print(f"❌ Raw audio transcription error: {e}")
            raise Exception(f"Failed to transcribe raw audio: {str(e)}")
    
    @staticmethod
    def get_supported_languages():
        """Get list of supported languages"""
        return ["en", "hi", "mr"]
    
    def change_language(self, language):
        """Change the language model"""
        if language not in self.MODELS:
            raise ValueError(f"Unsupported language: {language}")
        
        self.language = language
        self.model_path = self.MODELS[language]
        
        if not os.path.exists(self.model_path):
            raise ValueError(f"Model not found for language: {language}")
        
        self.model = Model(self.model_path)
        print(f"✅ Language changed to: {language}")
