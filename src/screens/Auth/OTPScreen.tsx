import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function OTPScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput | null>(null);
  const [boxLayout, setBoxLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(30);
  const [resendLoading, setResendLoading] = useState(false);

  // If an email was passed in route params use it, otherwise fall back to a placeholder
  // Assumption: parent may pass { email: string }
  // If not present we'll show a sensible placeholder matching the design example.
  // TODO: replace with real user email from auth state when available.
  // @ts-ignore
  const email = (route.params && (route.params as any).email) || 'danielakin557@gmail.com';

  const handleChange = (text: string) => {
  // strip any non-digit characters and clamp to 6 digits
  const digits = (text || '').replace(/\D/g, '').slice(0, 6);
  setCode(digits);
  // clear error while user types
  if (error) setError('');
  };

  const verifyCode = () => {
    if (code.trim().length !== 6) return;

    // start loading and clear previous error
    setError('');
    setLoading(true);

    // Simulate async verification (replace with real API call)
    setTimeout(() => {
      // placeholder valid code
      if (code !== '123456') {
        setError('Invalid code. Please try again.');
        setLoading(false);
        return;
      }

      setLoading(false);
      (navigation as any).navigate('OTPSuccess');
    }, 900);
  };

  // countdown timer for resend
  useEffect(() => {
    let timer: any = null;
    if (secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            if (timer) {
              clearInterval(timer);
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [secondsLeft]);

  const handleResend = () => {
    if (secondsLeft > 0 || resendLoading) return;
    setResendLoading(true);
    // simulate resend API call
    setTimeout(() => {
      setResendLoading(false);
      setSecondsLeft(30);
    }, 800);
  };

  const focusInput = () => inputRef.current && inputRef.current.focus();

  return (
    <SafeAreaView style={styles.root}>
      <View pointerEvents="none" style={styles.topCircle} />
      <View style={styles.headerRow}>
        <TouchableOpacity
          hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
          style={[styles.back, styles.backAbsolute]}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../../assets/icons/arrowleft.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>Enter the code to continue</Text>

        <Image source={require('../../../assets/images/otp.png')} style={styles.illustration} resizeMode="contain" />

        <Text style={styles.smallNote}>We sent a code to</Text>
        <Text style={styles.emailText}>{email}</Text>

        <TouchableOpacity
          activeOpacity={1}
          onPress={focusInput}
          style={styles.boxRow}
          onLayout={(e) => setBoxLayout(e.nativeEvent.layout)}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i} style={[styles.box, code[i] ? styles.boxFilled : null]}>
              <Text style={styles.boxText}>{code[i] ?? ''}</Text>
            </View>
          ))}
        </TouchableOpacity>

  {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* hidden input that collects the digits */}
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleChange}
          keyboardType="number-pad"
          inputMode="numeric"
          returnKeyType="done"
          maxLength={6}
          style={[
            styles.hiddenInput,
            boxLayout
              ? { left: boxLayout.x, top: boxLayout.y, width: boxLayout.width, height: boxLayout.height }
              : {},
          ]}
          importantForAutofill="no"
          textContentType="oneTimeCode"
          editable
          caretHidden={false}
          underlineColorAndroid="transparent"
          onKeyPress={(e) => {
            // make backspace predictable across platforms
            if (e.nativeEvent.key === 'Backspace') {
              setCode((prev) => prev.slice(0, -1));
            }
          }}
        />

        <TouchableOpacity
          style={[styles.button, (code.trim().length < 6 || loading) && styles.buttonDisabled]}
          onPress={verifyCode}
          disabled={code.trim().length < 6 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        <View style={styles.resendRow}>
          <Text style={styles.resendNote}>Didn't receive the code?</Text>
          <TouchableOpacity onPress={handleResend} disabled={secondsLeft > 0 || resendLoading}>
            <Text style={[styles.resendLink, (secondsLeft > 0 || resendLoading) && styles.resendDisabled]}>
              {resendLoading ? 'Sending...' : secondsLeft > 0 ? ` Send Again (${secondsLeft}s)` : ' Send Again'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  topCircle: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: '#CFEFD9', left: -60, top: -60 },
  headerRow: { height: 56, justifyContent: 'center', paddingLeft: width * 0.08, paddingTop: 12 },
  back: { paddingHorizontal: 8, paddingVertical: 8 },
  backAbsolute: { position: 'absolute', left: width * 0.08, top: 16, zIndex: 1000 },
  backIcon: { width: 18, height: 18, tintColor: '#222' },
  container: { paddingHorizontal: width * 0.08, alignItems: 'center', paddingTop: 110 },
  title: { fontSize: 28, fontWeight: '700', color: '#111', alignSelf: 'flex-start', marginTop: 0 },
  subtitle: { fontSize: 14, color: '#666', alignSelf: 'flex-start', marginBottom: 10 },
  illustration: { width: width * 0.7, height: width * 0.45, marginVertical: 8 },
  smallNote: { fontSize: 13, color: '#888', marginTop: 6 },
  emailText: { fontSize: 14, color: '#222', fontWeight: '600', marginBottom: 12 },
  boxRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 8, marginBottom: 20 },
  box: { width: (width - width * 0.16 - 32) / 6, height: 52, borderRadius: 8, borderWidth: 1, borderColor: '#E6E6E6', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  boxFilled: { borderColor: '#2e8b57' },
  boxText: { fontSize: 20, fontWeight: '700', color: '#111' },
  hiddenInput: { position: 'absolute', opacity: 0, height: 40, width: 40 },
  button: { backgroundColor: '#2e8b57', paddingVertical: 14, borderRadius: 28, width: '100%', alignItems: 'center', marginBottom: 12 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  errorText: { color: '#d23f31', fontSize: 13, marginTop: 8, alignSelf: 'flex-start' },
  resendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  resendNote: { color: '#666', fontSize: 13 },
  resendLink: { color: '#2e8b57', fontWeight: '600', fontSize: 13 },
  resendDisabled: { color: '#A9A9A9' },
});
