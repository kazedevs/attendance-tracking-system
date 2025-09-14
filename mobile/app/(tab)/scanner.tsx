import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const SCAN_BOX_SIZE = width * 0.8;

export default function Scanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanLineAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start scanning line animation
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (hasPermission) {
      startAnimation();
    }

    return () => {
      scanLineAnimation.stopAnimation();
    };
  }, [hasPermission, scanLineAnimation]);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await requestPermission();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    // Handle the scanned data here
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );

    // Reset after 2 seconds
    setTimeout(() => setScanned(false), 2000);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Requesting camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.scanBox}>
          {/* Corner styling */}
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
          
          {/* Scanning line animation */}
          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [
                  {
                    translateY: scanLineAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, SCAN_BOX_SIZE - 2],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.scanText}>Position QR code within the frame</Text>
          <Text style={styles.scanSubText}>Hold steady for optimal scanning</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    position: "relative",
    backgroundColor: "transparent",
  },
  cornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#00ff41",
    borderTopLeftRadius: 8,
  },
  cornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#00ff41",
    borderTopRightRadius: 8,
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#00ff41",
    borderBottomLeftRadius: 8,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#00ff41",
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#00ff41",
    opacity: 0.8,
    shadowColor: "#00ff41",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  instructionContainer: {
    position: "absolute",
    bottom: 100,
    alignItems: "center",
  },
  scanText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  scanSubText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  permissionButton: {
    backgroundColor: "#2B8C4F",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
