import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Share,
  Platform,
} from 'react-native';
import { SPACING, RADIUS, ThemeColors } from '../styles/theme';
import { useTheme } from '../styles/ThemeContext';
import { ToMeIcon } from '../components/ToMeIcon';
import { MemoryItem } from '../../types';
import { isWeb } from '../storage';

interface MemoriesScreenProps {
  memories: MemoryItem[];
  onOpenMemoryDetail: (memory: MemoryItem) => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

type MemoryFilter = 'all' | 'photo' | 'voice' | 'thought';

export const MemoriesScreen: React.FC<MemoriesScreenProps> = ({
  memories,
  onOpenMemoryDetail,
  onOpenPhotoLightbox,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<MemoryFilter>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() =>
    memories.reduce((acc, m) => (m.isFavorite ? { ...acc, [m.id]: true } : acc), {})
  );

  const filterPills: { id: MemoryFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: memories.length },
    { id: 'photo', label: 'Photos', count: memories.filter((m) => m.type === 'photo').length },
    { id: 'voice', label: 'Voice notes', count: memories.filter((m) => m.type === 'voice').length },
    {
      id: 'thought',
      label: 'Milestones',
      count: memories.filter((m) => m.type === 'thought' || m.type === 'milestone').length,
    },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shareMemory = async (mem: MemoryItem) => {
    const message = `${mem.quote}\n\nSaved in ToMe.`;
    try {
      if (!isWeb) {
        await Share.share({ message });
      } else {
        const nav = navigator as unknown as {
          share?: (data: { text: string }) => Promise<void>;
        };
        await nav.share?.({ text: message });
      }
    } catch {}
  };

  const filteredMemories = memories.filter((m) => {
    if (activeFilter !== 'all' && m.type !== activeFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.quote?.toLowerCase().includes(q) ||
      m.tag?.toLowerCase().includes(q)
    );
  });

  const sepMemories = filteredMemories.filter((m) => m.monthYear === 'September 2026');
  const augMemories = filteredMemories.filter((m) => m.monthYear === 'August 2026');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <ToMeIcon name="search" size={18} color={colors.outline} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search words, feelings, dates…"
            placeholderTextColor={colors.outline}
            style={styles.searchInput}
          />
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterPills.map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <React.Fragment key={pill.id}>
                <TouchableOpacity
                  onPress={() => setActiveFilter(pill.id)}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {pill.label} ({pill.count})
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </ScrollView>

        {/* Empty state */}
        {sepMemories.length === 0 && augMemories.length === 0 ? (
          <View style={styles.emptyState}>
            <ToMeIcon name="search_off" size={28} color={colors.outline} />
            <Text style={styles.emptyTitle}>No memories found</Text>
            <Text style={styles.emptySubtitle}>
              Try a different search or clear the filter.
            </Text>
          </View>
        ) : null}

        {/* Timeline Content */}
        <View style={styles.timelineContainer}>
          {/* September 2026 Section */}
          {sepMemories.length > 0 && (
            <View style={styles.monthSection}>
              <View style={styles.monthHeaderRow}>
                <Text style={styles.monthTitle}>September 2026</Text>
                <View style={styles.monthCountBadge}>
                  <Text style={styles.monthCountText}>{sepMemories.length} entries</Text>
                </View>
              </View>

              {sepMemories.map((mem) => (
                <React.Fragment key={mem.id}>
                  <View style={styles.memoryCard}>
                    {/* Tag & Date */}
                    <View style={styles.cardMetaRow}>
                      <Text style={styles.metaTag}>{mem.tag || 'MEMORY'}</Text>
                      <Text style={styles.metaDate}>{mem.dateLabel}</Text>
                    </View>

                    {/* Photo Memory */}
                    {mem.type === 'photo' && mem.photoUrl && (
                      <View style={styles.photoBlock}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => onOpenPhotoLightbox?.(mem.photoUrl!, mem.quote)}
                          style={styles.photoContainer}
                        >
                          <Image source={{ uri: mem.photoUrl }} style={styles.memoryPhoto} />
                          <View style={styles.analogBadge}>
                            <Text style={styles.analogBadgeText}>ANALOG FRAME</Text>
                          </View>
                        </TouchableOpacity>

                        {mem.quote && (
                          <Text style={styles.photoQuoteText}>{mem.quote}</Text>
                        )}

                        <TouchableOpacity
                          onPress={() => onOpenMemoryDetail(mem)}
                          style={styles.viewConversationLink}
                        >
                          <Text style={styles.linkText}>View full conversation →</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Voice Note Memory */}
                    {mem.type === 'voice' && (
                      <View style={styles.voiceBlock}>
                        <View style={styles.voiceHeaderRow}>
                          <TouchableOpacity
                            onPress={() =>
                              setPlayingId(playingId === mem.id ? null : mem.id)
                            }
                            style={styles.voicePlayBtn}
                          >
                            <ToMeIcon
                              name={playingId === mem.id ? 'pause' : 'play_arrow'}
                              size={18}
                              color={colors.onPrimary}
                            />
                          </TouchableOpacity>

                          <View style={styles.voiceWaveformContainer}>
                            <View style={styles.waveformBars}>
                              {[2, 4, 6, 3, 5, 4, 2, 6, 4, 5, 3, 2, 4, 6, 3].map((h, i) => (
                                <React.Fragment key={i}>
                                  <View
                                    style={[
                                      styles.waveformBar,
                                      { height: h * 3 },
                                      playingId === mem.id && i < 8 && styles.barActive,
                                    ]}
                                  />
                                </React.Fragment>
                              ))}
                            </View>
                            <Text style={styles.audioDurationText}>
                              {playingId === mem.id ? '0:14 / 0:48' : mem.audioDuration || '0:48'}
                            </Text>
                          </View>
                        </View>

                        {mem.quote && (
                          <View style={styles.transcriptBox}>
                            <Text style={styles.transcriptLabel}>TRANSCRIPT EXCERPT</Text>
                            <Text style={styles.transcriptText}>{mem.quote}</Text>
                          </View>
                        )}
                      </View>
                    )}

                    {/* Thought Memory */}
                    {mem.type === 'thought' && (
                      <View style={styles.thoughtBlock}>
                        <Text style={styles.thoughtQuote}>{mem.quote}</Text>

                        <View style={styles.thoughtFooterRow}>
                          <TouchableOpacity
                            onPress={() => onOpenMemoryDetail(mem)}
                            style={styles.reflectionBtn}
                          >
                            <Text style={styles.reflectionBtnText}>Resurface inquiry →</Text>
                          </TouchableOpacity>

                          <View style={styles.thoughtIcons}>
                            <TouchableOpacity onPress={() => toggleFavorite(mem.id)}>
                              <ToMeIcon
                                name={favorites[mem.id] ? 'favorite' : 'favorite_border'}
                                size={18}
                                color={favorites[mem.id] ? colors.secondary : colors.outline}
                              />
                            </TouchableOpacity>
<TouchableOpacity onPress={() => shareMemory(mem)}>
  <ToMeIcon name="share" size={18} color={colors.outline} />
</TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </React.Fragment>
              ))}
            </View>
          )}

          {/* August 2026 Section */}
          {augMemories.length > 0 && (
            <View style={styles.monthSection}>
              <View style={styles.monthHeaderRow}>
                <Text style={styles.monthTitle}>August 2026</Text>
                <View style={styles.monthCountBadge}>
                  <Text style={styles.monthCountText}>{augMemories.length} entries</Text>
                </View>
              </View>

              {augMemories.map((mem) => (
                <React.Fragment key={mem.id}>
                  <View style={styles.memoryCard}>
                    <View style={styles.cardMetaRow}>
                      <Text style={styles.metaTag}>{mem.tag || 'MEMORY'}</Text>
                      <Text style={styles.metaDate}>{mem.dateLabel}</Text>
                    </View>

                    <Text style={styles.thoughtQuote}>{mem.quote}</Text>

                    <View style={styles.thoughtFooterRow}>
                      <TouchableOpacity
                        onPress={() => onOpenMemoryDetail(mem)}
                        style={styles.reflectionBtn}
                      >
                        <Text style={styles.reflectionBtnText}>Resurface inquiry →</Text>
                      </TouchableOpacity>

                      <View style={styles.thoughtIcons}>
                        <TouchableOpacity onPress={() => toggleFavorite(mem.id)}>
                          <ToMeIcon
                            name={favorites[mem.id] ? 'favorite' : 'favorite_border'}
                            size={18}
                            color={favorites[mem.id] ? colors.secondary : colors.outline}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <ToMeIcon name="share" size={18} color={colors.outline} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              ))}
            </View>
          )}
        </View>

        {/* Peaceful Footer */}
        <View style={styles.footer}>
          <ToMeIcon name="spa" size={18} color={colors.outline} />
          <Text style={styles.footerText}>
            Your garden of memories is growing quietly.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
  },
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.md,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  filterPillActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  filterText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.onSecondary,
  },
  timelineContainer: {
    gap: SPACING.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    gap: 6,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: colors.onSurface,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  monthSection: {
    gap: SPACING.sm,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  monthTitle: {
    fontSize: 18,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: colors.onSurface,
  },
  monthCountBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  monthCountText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  memoryCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.secondary,
    textTransform: 'uppercase',
  },
  metaDate: {
    fontSize: 11,
    color: colors.outline,
  },
  photoBlock: {
    gap: 8,
  },
  photoContainer: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    height: 180,
  },
  memoryPhoto: {
    width: '100%',
    height: '100%',
  },
  analogBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(10, 7, 6, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  analogBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#ffffff',
  },
  photoQuoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.onSurface,
  },
  viewConversationLink: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  linkText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  voiceBlock: {
    gap: 8,
  },
  voiceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    padding: 10,
    borderRadius: RADIUS.lg,
    gap: 10,
  },
  voicePlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceWaveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waveformBars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  waveformBar: {
    width: 3,
    backgroundColor: colors.outlineVariant,
    borderRadius: 1.5,
  },
  barActive: {
    backgroundColor: colors.secondary,
  },
  audioDurationText: {
    fontSize: 11,
    color: colors.outline,
  },
  transcriptBox: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 10,
    borderRadius: RADIUS.md,
    gap: 4,
  },
  transcriptLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.outline,
  },
  transcriptText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.onSurface,
  },
  thoughtBlock: {
    gap: 10,
  },
  thoughtQuote: {
    fontSize: 16,
    fontFamily: 'Literata',
    fontStyle: 'italic',
    color: colors.onSurface,
    lineHeight: 24,
  },
  thoughtFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  reflectionBtn: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  reflectionBtnText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  thoughtIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: colors.outline,
    fontFamily: 'Literata',
    fontStyle: 'italic',
  },
  });
